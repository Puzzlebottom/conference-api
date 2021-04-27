const generateSessionIndex = () => {
    return sessions[0].length + 1
}

export class Session {
    _title;
    _sessionStartTime;
    _sessionIndex;
    _talks;

    constructor(userInput) {
        this._title = userInput.title;
        this._sessionStartTime = userInput.startTime;
        this._sessionIndex = 0;
        this._talks = [];
    }

}