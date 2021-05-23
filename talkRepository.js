import {database} from "./database.js"
import {Talk} from "./Talk.js";

export const talkRepository = {
    save: async (newTalkData) => {
        await database.raw(`INSERT INTO talks VALUES (DEFAULT, ?, ?, ?)`, [newTalkData.title, newTalkData.duration, newTalkData.sessionId]);
    },

    findAllBySessionId: async (id) => {
        const query = await database.raw(`SELECT * FROM talks WHERE "sessionId" = ?`, [id]);
        const rows = await query.rows;
        return await rows.map(talk => new Talk(talk));
    },

    load: async () => {
        const query = await database.raw(`SELECT * FROM talks`);
        return await query.rows
    }
}
