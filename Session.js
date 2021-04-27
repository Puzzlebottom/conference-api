export class Session {
    _title;
    _sessionStartTime;
    _id;
    _talks;
    _duration;
    _nextAvailableTimeslot;
    _dropdown;

    constructor(userInput, id) {
        this._title = userInput.title;
        this._sessionStartTime = userInput.startTime;
        this._id = id;
        this._talks = [];
        this._duration = 0;
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
        return this._talks;
        // const renderedSessions = sessions.map(session => renderSession(session)).join('')
    }

    getSessionDuration() {
        return this._duration;
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    addTalk(Talk) {
        this._talks.push(Talk)
        this.updateDuration(Talk._duration)
        this.updateNextAvailableTimeslot(Talk._duration)
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