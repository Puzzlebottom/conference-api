import { v4 as uuidv4 } from 'uuid';
import moment from "moment"
import { Talk } from "./Talk.js"
import { sessionRepository } from "./sessionRepository.js";
import { talkRepository } from "./talkRepository.js";

export const assignNewTalk = (talk) => {
    const session = sessionRepository.findById(talk._assignedToSession);
    talk.setTalkStartTime(session.getNextAvailableTimeslot());
    talkRepository.save(talk._assignedToSession, talk);
    session.updateSessionAttributes(talk._duration)
}

export const getTotalDurationOfTalks = (sessionId) => {
    const talks = talkRepository.findAllBySessionId(sessionId);
    //const durations = talks.map(this.getDuration());

    const getDuration = (talk) => {
        return talk._duration
    };
    const durations = talks.map(getDuration);
    //
    // let total = 0;
    // for (const talk of talks) {
    //     total += talk.getDuration()
    // }
    // return total;

    // talks.map( ujjconsole.log(Talk._duration));

    // talks.map(console.log(Talk.getDuration()));

    // talks.map(console.log(talk.getDuration()));

    // talks.map(console.log(this.getDuration()));

    return durations.reduce((a, b) => a + b, 0);
}

const getTalkStartTime = () => {

}

const getPriorTalks = () => {

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
        const duration = getTotalDurationOfTalks(this._id)
        if(duration < 60) {
            return duration + ' min';
        } else {
            return Math.floor(duration/60) + ' h ' + (duration % 60) + ' min'
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