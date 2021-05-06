import moment from "moment"
import {talkRepository} from "./talkRepository.js";
import {sessionRepository} from "./sessionRepository.js";

export class Talk {
    _talkId;
    _title;
    _duration;
    _sessionId;


    constructor (newTalkData) {
        this._talkId = parseInt(newTalkData.id);
        this._title = newTalkData.title;
        this._duration = parseInt(newTalkData.duration);
        this._sessionId = newTalkData.sessionid;

    }

    getTitle() {
        return this._title
    }

    getDuration() {
        return this._duration
    }

    getTalkStartTime() {
        const priorTalks = this.getPriorTalks();
        const priorTalksDuration = priorTalks.reduce((partialSum, talk2) => talk2.getDuration(), 0);
        const sessionStartTime = (sessionRepository.findById)(this._sessionId).getSessionStartTime();
        return moment(sessionStartTime, 'h:mm a')
            .add(priorTalksDuration, 'minutes')
            .format('h:mm a');
    }

    getPriorTalks = () => {
        const talks = talkRepository.findAllBySessionId(this._sessionId);
        const thisIndex = talks.findIndex(talk => talk._talkId === this._talkId);
        return talks.slice(0, thisIndex);
    }

}