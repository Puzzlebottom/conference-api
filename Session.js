import {database} from "./database.js";

export class Session {
    _id;
    _title;
    _sessionStartTime;
    _dropdown;

    constructor(newSessionData) {
        this._id = newSessionData.id;
        this._title = newSessionData.title;
        this._sessionStartTime = newSessionData.startTime;
        this._dropdown = this.formatDropDownTemplate();
    }

    getId() {
        return this._id;
    }

    getSessionTitle() {
        return this._title;
    }

    getSessionDropdownOption() {
        return this._dropdown;
    }

    getSessionStartTime() {
        return this._sessionStartTime;
    }

    async sumDurationOfTalks() {
        const query = await database.raw(`SELECT SUM(duration) FROM talks WHERE "sessionId" = ?`, [this._id]);
        const rows = await query.rows;
        return parseInt(rows[0].sum);
    }

    async formatDurationIntoHoursAndMinutes() {
        const duration = await this.sumDurationOfTalks();
        if(duration < 60) {
            return duration + ' min';
        } else {
            return Math.floor(duration/60) + ' h ' + (duration % 60) + ' min'
        }
    }

    formatDropDownTemplate() {
        const template = `<option value="%sessionId%">%title%</option>`
        return template.replace('%sessionId%', this._id).replace('%title%', this._title);
    }
}