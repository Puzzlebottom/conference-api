import {database} from "./database.js"
import {Talk} from "./Talk.js";

export const talkRepository = {
    save: async (newTalkData) => {
        await database.raw(`INSERT INTO talks VALUES (DEFAULT, ?, ?, ?)`, [newTalkData[0].title, newTalkData[0].duration, newTalkData[0].sessionId]);
    },

    findAllBySessionId: async (sessionId) => {
        const query = await database.raw(`SELECT * FROM talks WHERE "sessionId" = ?`, [sessionId]);
        const rows = await query.rows;
        const talks = await rows.map(talk => new Talk(talk));
        return talks;
    }
}
