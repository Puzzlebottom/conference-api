import moment from "moment"
import {database} from "./database.js";
import {talkRepository} from "./talkRepository.js";
import {sessionRepository} from "./sessionRepository.js";

export class Talk {
    _id;
    _title;
    _duration;
    _sessionId;
    _talkError;

    constructor (newTalkData) {
        this._id = newTalkData.id;
        this._title = newTalkData.title;
        this._duration = newTalkData.duration;
        this._sessionId = newTalkData.sessionId;
        this._talkError = '';
    }

    getId() {
        return this._id
    }

    getTitle() {
        return this._title
    }

    getDuration() {
        return this._duration
    }

    getSessionId() {
        return this._sessionId
    }

    getTalkError() {
        return this._talkError
    }

    setTalkError(errorCode) {
        this._talkError = errorCode;
        return false;
    }

    getValidationError() {
        let errorMessage = '';
        switch(this.getTalkError()) {
            case 'missing title':
                errorMessage = 'Please enter a title for this talk';
                break;
            case 'non-unique title':
                errorMessage = 'That session already contains a talk with this title';
                break;
            case 'invalid duration':
                errorMessage = 'Please enter a valid duration in minutes';
                break;
            default:
                errorMessage = 'Error';
        }
        return errorMessage;
    }

    async isValid() {
        const hasTitle = () => {
            return this.getTitle() !== '' ? true : this.setTalkError('missing title')
        };
        const hasUniqueTitle = async () => {
            const count = await talkRepository.countWhereSessionIdAndTitle(this.getSessionId(), this.getTitle());
            return count === 0 ? true : this.setTalkError('non-unique title');

        };
        const hasValidDuration = () => {
            return parseInt(this.getDuration()) > 0 ? true : this.setTalkError('invalid duration')
        };
        return hasTitle() === true &&
          await hasUniqueTitle() === true &&
          hasValidDuration() === true;
    }

    async getTalkStartTime() {
        const sumDurationOfPriorTalks = async () => {
            const query = await database.raw(`SELECT SUM(duration) FROM talks WHERE id < ? AND "sessionId" = ?`, [this.getId(), this.getSessionId()]);
            const rows = await query.rows;
            return parseInt(rows[0].sum);
        }
        const sessionStartTime = async () => {
            const query = await database.raw(`SELECT * FROM sessions WHERE id = ?`, [this.getSessionId()]);
            const rows = await query.rows;
            return rows[0].startTime;
        }
        return moment(await sessionStartTime(), 'h:mm a')
            .add(await sumDurationOfPriorTalks(), 'minutes')
            .format('h:mm a');
    }
}