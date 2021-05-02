const talks = {};

export const talkRepository = {
    save: (sessionId, talk) => {
        talks[sessionId] = talks[sessionId] || [];
        talks[sessionId].push(talk);
    },

    findAllBySessionId: (sessionId) => {
        talks[sessionId] = talks[sessionId] || [];
        return talks[sessionId];
    }
}
