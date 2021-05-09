import {database} from "./database.js";
import {Session} from "./Session.js";

const getIndexById = (searchId) => {
    for(let i = 0; i < sessions.length; i += 1) {
        if ((sessions[i]._id) === parseInt(searchId)) {
            return i;
        }
    } return 'ERROR'
}

export const sessionRepository = {
    save: async (newSessionData) => {
        await database.raw(`INSERT INTO sessions VALUES (DEFAULT, ?, ?)`, [newSessionData[0].title, newSessionData[0].startTime]);
    },

    findSessionById: async (sessionId) => {
        const query = await database.raw(`SELECT * FROM sessions WHERE id = ?`, [sessionId]);
        const rows = await query.rows;
        const session = await rows.map(session => new Session(session));
        return session;
    },

    findAll: async () => {
        const query = await database.raw(`SELECT * FROM sessions`);
        const rows = await query.rows;
        const sessions = await rows.map(session => new Session(session));
        return sessions;
    }
};

export class DatabaseError extends Error {

}