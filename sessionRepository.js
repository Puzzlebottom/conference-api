import { database } from './index.js'
import { Session } from "./Session.js"
import {Talk} from "./Talk.js";

const getIndexById = (searchId) => {
    for(let i = 0; i < sessions.length; i += 1) {
        if ((sessions[i]._id) === searchId) {
            return i;
        }
    } return 'ERROR'
}


export const sessionRepository = {
    save: async (session) => {
        const formatSessionToDatabase = () => {
            const template = `INSERT INTO sessions VALUES (DEFAULT, '%title%', '%sessionStartTime%');`
            return template.replace('%title%', session.title)
                .replace('%sessionStartTime%', session.starttime);
        }
        await database.raw(formatSessionToDatabase(session));
    },

    findById: async (sessionId) => {
        const formatQuery = () => {
            const template = `SELECT * FROM sessions WHERE id = %sessionId%;`
            return template.replace('%sessionId%', sessionId)
            };
        await database.raw(formatQuery(sessionId)).rows;
    },

    findAll: async () => {
        const result = await database.raw('SElECT * FROM sessions;');
        console.log(result.rows.map(row => new Session(row)));
        return result.rows.map(row => new Session(row));
        }
};

export class DatabaseError extends Error {

}