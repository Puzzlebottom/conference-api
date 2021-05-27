import moment from 'moment';
import {sessionRepository} from "./sessionRepository.js";

export class Session {
    _id;
    _title;
    _sessionStartTime;
    _dropdown;

    constructor(newSessionData) {
        this._id = newSessionData.id;
        this._title = newSessionData.title;
        this._sessionStartTime = newSessionData.startTime;
        this._dropdown = this.formatDropDownTemplate();
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

    async getValidationError() {
        let errors = '';
        const hasTitle = () => {
            if(this.getSessionTitle() !== '') {
                return true
            } else errors = 'Please enter a title for this talk'
        }
        const noDuplicateTitles = async () => {
            const count = await sessionRepository.countDuplicateTitles(this.getSessionTitle());
            if(count === 0) {
                return true
            } else errors = 'A session with that name already exists'
        }
        const hasValidStartTime = () => {
            const validTimeFormats = ["h:mm a", "h:mm A", "H:mm a", "H:mm A", "hh:mm a", "hh:mm A", "HH:mm a", "HH:mm A", "HH:mm", "H:mm"]
            const time = this.getSessionStartTime()
            if(moment(time, validTimeFormats,true).isValid()) {
                return true
            } else errors = 'Enter a start time in a valid format (h:mm am/pm)'
        };
        hasTitle()
        await noDuplicateTitles()
        hasValidStartTime()
        return errors;
    }

    async isValid() {
        const errors = await this.getValidationError()
        return errors.length === 0;
    }

    async formatDurationIntoHoursAndMinutes() {
        const duration = await sessionRepository.sumDurationOfTalks(this.getId());
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