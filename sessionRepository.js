import {database} from "./database.js";
import {Session} from "./Session.js";

export const sessionRepository = {
    save: async (newSessionData) => {
        await database.raw(`INSERT INTO sessions VALUES (DEFAULT, ?, ?)`, [newSessionData.title, newSessionData.startTime]);
    },

    load: async () => {
        const query = await database.raw(`SELECT * FROM sessions`);
        return await query.rows;
    },

    findSessionById: async (sessionId) => {
        const query = await database.raw(`SELECT * FROM sessions WHERE id = ?`, [sessionId]);
        return query.rows.map(session => new Session(session));
    },

    countDuplicateTitles: async (title) => {
        const result = await database.raw(`SELECT COUNT(*) FROM sessions WHERE title = ?`, [title]);
        return parseInt(result.rows[0].count);
    },

    findAll: async () => {
        const query = await database.raw(`SELECT * FROM sessions`);
        return query.rows.map(session => new Session(session));
    },

    clearTable: async () => {
        await database.raw('DELETE FROM sessions');
    },

    sumDurationOfTalks: async (sessionId) => {
        const query = await database.raw(`SELECT SUM(duration) FROM talks WHERE "sessionId" = ?`, [sessionId]);
        return parseInt(query.rows[0].sum)
    },

    getSessionStartTimeById: async (sessionId) => {
        const query = await database.raw(`SELECT "startTime" FROM sessions WHERE id = ?`, [sessionId]);
        return query.rows[0].startTime
    }
};
