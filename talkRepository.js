import { database } from "./index.js";

const talks = {};

export const talkRepository = {
    save: async (talk) => {
        const formatTalkToDatabase = () => {
            const template = `INSERT INTO talks VALUES (DEFAULT, '%title%', '%duration%', '%sessionId%');`
            return template.replace('%title%', talk._title)
                .replace('%duration%', talk._duration)
                .replace('%sessionId%', talk._sessionId);
        }
        await database.raw(formatTalkToDatabase(talk));
    },

    findAllBySessionId: async (sessionId) => {
        const formatQuery = () => {
            const template = `SELECT * FROM talks WHERE id = %sessionId%;`
            return template.replace('%sessionId%', sessionId)
        };
        return (await database.raw(formatQuery(sessionId))).rows;
    },
}
