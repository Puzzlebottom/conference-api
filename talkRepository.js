import {database} from "./database.js"

const talks = {};

export const talkRepository = {
    save: async (sessionId, talk) => {
        const formatTalkToDatabase = () => {
            const template = `INSERT INTO talks VALUES (DEFAULT, '%title%', '%duration%', '%sessionId%');`
            return template.replace('%title%', talk.getTitle())
              .replace('%duration%', talk.getDuration())
              .replace('%sessionId%', talk.getSessionId());
        }

        await database.raw(formatTalkToDatabase());

        talks[sessionId] = talks[sessionId] || [];
        talks[sessionId].push(talk);
    },

    findAllBySessionId: (sessionId) => {
        talks[sessionId] = talks[sessionId] || [];
        return talks[sessionId];
    }
}
