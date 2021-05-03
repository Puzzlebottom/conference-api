import { v4 as uuidv4 } from 'uuid';
import moment from "moment"
import { sessionRepository } from "./sessionRepository.js";
import { talkRepository } from "./talkRepository.js";

export const assignNewTalk = (talk) => {
    const session = sessionRepository.findById(talk._assignedToSession);
    talk.setTalkStartTime(session.getNextAvailableTimeslot());
    talkRepository.save(talk._assignedToSession, talk);
    session.updateSessionAttributes(talk._duration)
}

export class Session {
    _title;
    _sessionStartTime;
    _id;
    _duration;
    _nextAvailableTimeslot;
    _dropdown;

    constructor(userInput) {
        this._title = userInput.title; //add a check to see if the name already exists.  append a bracketed counter to duplicate names
        this._sessionStartTime = userInput.startTime;
        this._id = uuidv4();
        this._duration = 0
        this._nextAvailableTimeslot = this._sessionStartTime;
        this._dropdown = this.formatDropDownTemplate();
    }

    getSessionTitle() {
        return this._title;
    }

    getSessionDuration() {
        if(this._duration < 60) {
            return this._duration + ' min';
        } else {
            return Math.floor(this._duration/60) + ' h ' + (this._duration % 60) + ' min'
        }
    }

    getNextAvailableTimeslot() {
        return this._nextAvailableTimeslot
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    updateSessionAttributes(minutes) {
        this._duration = this._duration += parseInt(minutes);
        this._nextAvailableTimeslot =  moment(this._nextAvailableTimeslot, 'hh:mm a').add(minutes, 'minutes').format('hh:mm a');
    }

    formatDropDownTemplate() {
        const template = `<option value="%sessionId%">%title%</option>`
        return template.replace('%sessionId%', this._id).replace('%title%', this._title);
    }
}