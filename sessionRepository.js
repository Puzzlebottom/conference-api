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
            const template = `INSERT INTO sessions VALUES (DEFAULT, '%title%', '%sessionId%', '%sessionStartTime%');`
            return template.replace('%title%', session._title)
                .replace('%sessionId%', session._id)
                .replace('%sessionStartTime%', session._sessionStartTime);
        }
        await database.raw(formatSessionToDatabase(session));
    },

    findById: async (sessionId) => {
        const formatQuery = () => {
            const template = `SELECT * FROM sessions WHERE id = %sessionId%;`
            return template.replace('%sessionId%', sessionId)
            };
        return (await database.raw(formatQuery(sessionId))).rows;
    },

    findAll: async () => {
            const result = await database.raw('SELECT * from sessions;');
            console.log(result.rows)
            return result.rows.map(row => new Session(row));
        }
};

export class DatabaseError extends Error {

}