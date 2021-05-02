const sessions = [];

const getIndexById = (searchId) => {
    for(let i = 0; i < sessions.length; i += 1) {
        if ((sessions[i]._id) === searchId) {
            return i;
        }
    } return 'ERROR'
}

export const sessionRepository = {
    save: (session) => {
        sessions.push(session);
    },

    findById: (sessionId) => {
        return sessions[getIndexById(sessionId)];
    },

    findAll: () => {
        return sessions;
    }
};

export class DatabaseError extends Error {

}