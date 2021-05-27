import {database} from "./database.js";
import moment from 'moment';
import {sessionRepository} from "./sessionRepository.js";

export class Session {
    _id;
    _title;
    _sessionStartTime;
    _dropdown;
    _sessionError;

    constructor(newSessionData) {
        this._id = newSessionData.id;
        this._title = newSessionData.title;
        this._sessionStartTime = newSessionData.startTime;
        this._dropdown = this.formatDropDownTemplate();
        this._sessionError = '';
    }

    getId() {
        return this._id;
    }

    getSessionTitle() {
        return this._title;
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    getSessionStartTime() {
        return this._sessionStartTime;
    }

    getSessionError() {
        return this._sessionError;
    }

    setSessionError(error) {
        this._sessionError = error;
        return false;
    }

    getValidationError() {
        let errorMessage = '';
        switch(this.getSessionError()) {
            case 'missing title':
                errorMessage = 'Please enter a title for this session';
                break;
            case 'non-unique title':
                errorMessage = 'A session already exists with that title';
                break;
            case 'invalid startTime':
                errorMessage = 'Please enter a valid start time (hh:mm am/pm)';
                break;
            default:
                errorMessage = 'Error';
        }
        return errorMessage;
    }

    async isValid() {
        const hasTitle = () => {
            return this.getSessionTitle() !== '' ? true : this.setSessionError('missing title')
        };
        const hasUniqueTitle = async () => {
            const count = await sessionRepository.countDuplicateTitles(this.getSessionTitle());
            return count === 0 ? true : this.setSessionError('non-unique title');
        };
        const hasValidStartTime = () => {
            const validTimeFormats = ["h:mm a", "h:mm A", "H:mm a", "H:mm A", "hh:mm a", "hh:mm A", "HH:mm a", "HH:mm A", "HH:mm", "H:mm"]
            const time = this.getSessionStartTime()
            return moment(time, validTimeFormats,true).isValid() ?
              true :
              this.setSessionError('invalid startTime')
        };
        return hasTitle() === true &&
          await hasUniqueTitle() === true &&
          hasValidStartTime() === true;
    }

    async sumDurationOfTalks() {
        const query = await database.raw(`SELECT SUM(duration) FROM talks WHERE "sessionId" = ?`, [this._id]);
        const rows = await query.rows;
        return parseInt(rows[0].sum);
    }

    async formatDurationIntoHoursAndMinutes() {
        const duration = await this.sumDurationOfTalks();
        if(duration < 60) {
            return duration + ' min';
        } else {
            return Math.floor(duration/60) + ' h ' + (duration % 60) + ' min'
        }
    }

    formatDropDownTemplate() {
        const template = `<option value="%sessionId%">%title%</option>`
        return template.replace('%sessionId%', this._id).replace('%title%', this._title);
    }
}