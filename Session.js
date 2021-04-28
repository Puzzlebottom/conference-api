import { v4 as uuidv4 } from 'uuid';
import moment from "moment"

export const sessions = [];

export const assignNewTalk = (userInput) => {
    const talk = userInput
    const session = sessions[getIndexById(talk._assignedToSession)];
    talk.setTalkStartTime(session.getNextAvailableTimeslot());
    session._talks.push(talk);
    session.updateSessionAttributes(talk._duration)
}

const getIndexById = (searchId) => {
    for(let i = 0; i < sessions.length; i += 1) {
        if ((sessions[i]._id) === searchId) {
            return i;
        }
    } return 'ERROR'
}

export class Session {
    _title;
    _sessionStartTime;
    _id;
    _talks;
    _duration;
    _nextAvailableTimeslot;
    _dropdown;

    constructor(userInput) {
        this._title = userInput.title; //add a check to see if the name already exists.  append a bracketed counter to duplicate names
        this._sessionStartTime = userInput.startTime;
        this._id = uuidv4();
        this._talks = [];
        this._duration = 0
        this._nextAvailableTimeslot = this._sessionStartTime;
        this._dropdown = this.formatDropDownTemplate();
    }

    getSessionTitle() {
        return this._title;
    }

    getSessionTalks() {
        const talkTemplate = `<li><span>%timeOfTalk%</span>%title%</li>`;
        const mapTalksToTemplate = (talk) => {
            return talkTemplate.replace('%timeOfTalk%', escape(talk.getTalkStartTime())).replace('%title%', escape(talk.getTitle()) + ' ' + escape(talk.getDuration()) + 'm')
        }
        return this._talks.map(talk => mapTalksToTemplate(talk)).join('')
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
        return template.replace('%sessionId%', escape(this._id)).replace('%title%', escape(this._title))
    }
}