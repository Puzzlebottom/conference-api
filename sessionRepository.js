import {database} from "./database.js";
import {Session} from "./Session.js";

export const sessionRepository = {
    save: async (newSessionData) => {
        await database.raw(`INSERT INTO sessions VALUES (DEFAULT, ?, ?)`, [newSessionData.title, newSessionData.startTime]);
    },

    findSessionById: async (sessionId) => {
        const query = await database.raw(`SELECT * FROM sessions WHERE id = ?`, [sessionId]);
        const rows = await query.rows;
        return await rows.map(session => new Session(session));
    },

    findAll: async () => {
        const query = await database.raw(`SELECT * FROM sessions`);
        const rows = await query.rows;
        return await rows.map(session => new Session(session));
    },

    load: async () => {
        const query = await database.raw(`SELECT * FROM sessions`);
        return await query.rows;
    }
};
