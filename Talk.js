import moment from "moment"
import {database} from "./database.js";

export class Talk {
    _id;
    _title;
    _duration;
    _sessionId;

    constructor (newTalkData) {
        this._id = newTalkData.id;
        this._title = newTalkData.title;
        this._duration = newTalkData.duration;
        this._sessionId = newTalkData.sessionId;
    }

    getId() {
        return this._id
    }

    getTitle() {
        return this._title
    }

    getDuration() {
        return this._duration
    }

    getSessionId() {
        return this._sessionId
    }

    async getTalkStartTime() {
        const sumDurationOfPriorTalks = async () => {
            const query = await database.raw(`SELECT SUM(duration) FROM talks WHERE id < ?`, [this.getId()]);
            const rows = await query.rows;
            return parseInt(rows[0].sum);
        }
        const sessionStartTime = async () => {
            const query = await database.raw(`SELECT * FROM sessions WHERE id = ?`, [await this.getSessionId()]);
            const rows = await query.rows;
            return rows[0].startTime;
        }
        return moment(await sessionStartTime(), 'h:mm a')
            .add(await sumDurationOfPriorTalks(), 'minutes')
            .format('h:mm a');
    }
}