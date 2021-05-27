import {database} from "./database.js"
import {Talk} from "./Talk.js";

export const talkRepository = {
    save: async (newTalkData) => {
        await database.raw(`INSERT INTO talks VALUES (DEFAULT, ?, ?, ?)`, [newTalkData.title, newTalkData.duration, newTalkData.sessionId]);
    },

    load: async () => {
        const query = await database.raw(`SELECT * FROM talks`);
        return await query.rows
    },

    findAllBySessionId: async (id) => {
        const query = await database.raw(`SELECT * FROM talks WHERE "sessionId" = ?`, [id]);
        return query.rows.map(talk => new Talk(talk));
    },

    countWhereSessionIdAndTitle: async (sessionId, title) => {
        const result = await database.raw(`SELECT COUNT(*) FROM talks WHERE "sessionId" = ? AND title = ?`, [parseInt(sessionId), title]);
        return parseInt(result.rows[0].count);
    },

    clearTable: async () => {
        await database.raw('DELETE FROM talks');
    },

    sumDurationOfPriorTalks: async (talkId, sessionId) => {
        const query = await database.raw(`SELECT SUM(duration) FROM talks WHERE id < ? AND "sessionId" = ?`, [talkId, sessionId]);
        return parseInt(query.rows[0].sum)
    }
}
