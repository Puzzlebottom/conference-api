export class Talk {
    _title;
    _duration;
    _assignedToSession;
    _talkStartTime;

    constructor (title, duration, session) {
        this._title = title;
        this._duration = duration;
        this._assignedToSession = session;
        this._talkStartTime = getTalkStartTime();
    }

    addTalk(talk) {
        session
    }
}