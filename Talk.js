import moment from "moment"

export class Talk {
    _title;
    _duration;
    _assignedToSession;
    _talkStartTime;

    constructor (userInput) {
        this._title = userInput.title;
        this._duration = parseInt(userInput.duration);
        this._assignedToSession = userInput.sessionId;
    }

    getTitle() {
        return this._title
    }

    getDuration() {
        return this._duration
    }

    getTalkStartTime() {
        return this._talkStartTime
    }

    setTalkStartTime(time) {
        this._talkStartTime = moment(time, 'hh:mm a').format('hh:mm a');
    }
}