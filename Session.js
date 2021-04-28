import { v4 as uuidv4 } from 'uuid';
import { Talk } from './Talk.js';

export class Session {
    _title;
    _sessionStartTime;
    _id;
    _talks;
    _duration;
    _nextAvailableTimeslot;
    _dropdown;

    constructor(userInput) {
        this._title = userInput.title;
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

    getSessionStartTime() {
        return this._sessionStartTime;
    }

    getSessionId() {
        return this._id;
    }

    getSessionTalks() {
        const talkTemplate = `<li><span>%timeOfTalk%</span>%title%</li>`;
        const mapTalksToTemplate = (talk) => {
            return talkTemplate.replace('%timeOfTalk%', talk.getTalkStartTime()).replace('%title%', talk.getTitle() + ' ' + talk.getDuration() + 'm')
        }
        return this._talks.map(talk => mapTalksToTemplate(talk)).join('')
        // const renderedSessions = sessions.map(session => renderSession(session)).join('')
    }

    getSessionDuration() {
        return this._duration;
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    addTalk(talk) {
        this._talks.push(talk)
        this.updateDuration(talk._duration)
        this.updateNextAvailableTimeslot(talk._duration)
    }

    updateDuration(minutes) {
        this._duration = this._duration += minutes
    }

    formatDropDownTemplate() {
        const template = `<option value="%sessionId%">%title%</option>`
        return template.replace('%sessionId%', this._id).replace('%title%', this._title)
    }


    // updateNextAvailableTimeslot(minutes) {
    //     this._nextAvailableTimeslot = this._nextAvailableTimeslot +=
    // }
}