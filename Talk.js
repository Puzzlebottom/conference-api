export class Talk {
    _title;
    _duration;
    _assignedToSession;
    _talkStartTime;

    constructor (userInput) {
        this._title = userInput.title;
        this._duration = userInput.duration;
        this._assignedToSession = getSessionId(userInput.sessionName);
        this._talkStartTime = getTalkStartTime();
    }

    getTitle() {
        return this._title
    }

    getDuration() {
        return this._duration
    }

    getSessionId() {
        return this._assignedToSession
    }

    getTalkStartTime() {
        return this._talkStartTime
    }


}