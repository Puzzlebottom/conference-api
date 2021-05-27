import moment from "moment"
import {talkRepository} from "./talkRepository.js";
import {sessionRepository} from "./sessionRepository.js";

export class Talk {
    _id;
    _title;
    _duration;
    _sessionId;

    constructor (newTalkData) {
        this._id = newTalkData.id;
        this._title = newTalkData.title;
        this._duration = newTalkData.duration;
        this._sessionId = newTalkData.sessionId;
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

    async getValidationError() {
        let errors = '';
        const hasTitle = () => {
            if(this.getTitle() !== '') {
                return true
            } else errors = 'Please enter a title for this talk'
        }
        const hasUniqueTitle = async () => {
            const count = await talkRepository.countWhereSessionIdAndTitle(this.getSessionId(), this.getTitle());
            if(count === 0) {
                return true
            } else errors = 'That session already contains a talk with this title'
        }
        const hasValidDuration = () => {
            if(parseInt(this.getDuration()) > 0) {
                return true
            } else errors = 'Please enter a valid duration in minutes'
        }
        hasTitle()
        await hasUniqueTitle()
        hasValidDuration()
        return errors;
    }

    async isValid() {
        const errors = await this.getValidationError()
        return errors.length === 0;
    }

    async getTalkStartTime() {
        const durationOfPriorTalks = await talkRepository.sumDurationOfPriorTalks(this.getId(), this.getSessionId());
        const sessionStartTime = await sessionRepository.getSessionStartTimeById(this.getSessionId());
        return moment(sessionStartTime, 'h:mm a')
            .add(durationOfPriorTalks, 'minutes')
            .format('h:mm a');
    }
}