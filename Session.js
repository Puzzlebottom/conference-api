import { v4 as uuidv4 } from 'uuid';
import { talkRepository } from "./talkRepository.js";

export class Session {
    _title;
    _sessionStartTime;
    _id;
    _dropdown;

    constructor(newSessionData) {
        this._title = newSessionData.title; //add a check to see if the name already exists.  append a bracketed counter to duplicate names
        this._sessionStartTime = newSessionData.startTime;
        this._id = uuidv4();
        this._dropdown = this.formatDropDownTemplate();
    }

    getSessionTitle() {
        return this._title;
    }

    getTotalDurationOfTalks(sessionId) {
        const talks = talkRepository.findAllBySessionId(sessionId);
        const getDuration = (talk) => {
            return talk._duration
        };
        const durations = talks.map(getDuration);
        return durations.reduce((a, b) => a + b, 0);
    }

    formatDurationIntoHoursAndMinutes() {
        const duration = this.getTotalDurationOfTalks(this._id)
        if(duration < 60) {
            return duration + ' min';
        } else {
            return Math.floor(duration/60) + ' h ' + (duration % 60) + ' min'
        }
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    formatDropDownTemplate() {
        const template = `<option value="%sessionId%">%title%</option>`
        return template.replace('%sessionId%', this._id).replace('%title%', this._title);
    }
}