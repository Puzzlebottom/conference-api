import express from "express"
import path from "path"
import moment from "moment"
import bodyParser from "body-parser"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { renderPage } from "./html.js"
import { loggerMiddleware } from "./loggerMiddleware.js"
import { Session } from "./Session.js"
import { Talk } from "./Talk.js"

const PORT = process.env.port || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(loggerMiddleware);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send(renderPage(sessions));
});

const sessions = [];

const getIndexById = (searchId) => {
    for(let i = 0; i < sessions.length; i += 1) {
        if ((sessions[i]._id) === searchId) {
            return i;
        }
    } return 'ERROR'
}

app.post('/sessions', (req, res) => {
    const session = new Session(req.body);
    sessions.push(session);
    res.redirect('/');
});

app.post('/talks', (req, res) => {
    const talk = new Talk(req.body);
    sessions[getIndexById(talk._assignedToSession)]._talks.push(talk);
    res.redirect('/');
});

