import moment from "moment"
import {talkRepository} from "./talkRepository.js";
import {v4 as uuidv4} from "uuid";
import {sessionRepository} from "./sessionRepository.js";

export class Talk {
    _title;
    _duration;
    _assignedToSession;
    _talkId;

    constructor (newTalkData) {
        this._title = newTalkData.title;
        this._duration = parseInt(newTalkData.duration);
        this._assignedToSession = newTalkData.sessionId;
        this._talkId = uuidv4();
    }

    getTitle() {
        return this._title
    }

    getDuration() {
        return this._duration
    }

    getTalkStartTime() {
        const priorTalks = this.getPriorTalks();
        const offsetByDuration = () => {
            const getDuration = (talk) => {
                return talk._duration
            };
            const durations = priorTalks.map(getDuration);
            return durations.reduce((a, b) => a + b, 0);
        }
        const sessionStartTime = sessionRepository.findById(this._assignedToSession)._sessionStartTime;
        return moment(sessionStartTime, 'h:mm a').add(offsetByDuration(), 'minutes').format('h:mm a');
    }

    getPriorTalks = () => {
        const talks = talkRepository.findAllBySessionId(this._assignedToSession);
        const thisIndex = talks.findIndex(talk => talk._talkId === this._talkId);
        return talks.slice(0, thisIndex);
    }

}