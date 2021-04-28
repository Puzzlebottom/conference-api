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
        this._title = userInput.title; //add a check to see if the name already exists.  append a bracketed counter to duplicate names
        this._sessionStartTime = userInput.startTime; //add parsing function for 24hr clock, add AM PM
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
    }

    getSessionDuration() {
        return this._duration;
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    updateSessionAttributes(minutes) {
        this.updateDuration(minutes)
        this.updateNextAvailableTimeslot(minutes)
    }

    updateDuration(minutes) {
        if(this._duration > 60) {

        }
        //add parsing for hours & minutes
        this._duration = this._duration += parseInt(minutes);
    }

    updateNextAvailableTimeslot(minutes) {
        //add this._duration to the this._sessionStartTime and return timestamp as string
    }

    formatDropDownTemplate() {
        const template = `<option value="%sessionId%">%title%</option>`
        return template.replace('%sessionId%', this._id).replace('%title%', this._title)
    }
}