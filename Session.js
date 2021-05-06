import { talkRepository } from "./talkRepository.js";
import { database } from "./index.js"
import {Talk} from "./Talk.js";

export const getTotalDurationOfTalks = (sessionId) => {
    const talks = talkRepository.findAllBySessionId(sessionId);
    const getDuration = (talk) => {
        return talk._duration
    };
    const durations = talks.map(getDuration);
    return durations.reduce((a, b) => a + b, 0);
}


export class Session {
    _id;
    _title;
    _sessionStartTime;
    _dropdown;

    constructor(newSessionData) {
        this._id = newSessionData.id;
        this._title = newSessionData.title; //add a check to see if the name already exists.  append a bracketed counter to duplicate names
        this._sessionStartTime = newSessionData.starttime;
        this._dropdown = this.formatDropDownTemplate();
    }

    getSessionTitle() {
        return this._title;
    }

    getSessionStartTime() {
        return this._sessionStartTime;
    }

    async getTalks() {
        const result = await database.raw('SELECT * from talks');
        return result.rows.map(row => new Talk(row));

    }

    formatDurationIntoHoursAndMinutes() {
        const duration = getTotalDurationOfTalks(this._id);
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