import express from "express"
import path from "path"
import moment from "moment"
import bodyParser from "body-parser"
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { renderPage } from "./html.js"
import { loggerMiddleware } from "./loggerMiddleware.js"
import { Session } from "./Session.js"
// import { Talk } from "./Talk.js"

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

app.post('/sessions', (req, res) => {
    const session = new Session(req.body, uuidv4());
    sessions.push(session);
    res.redirect('/');
});

app.post('/talks', (req, res) => {
    const talk = new Talk(req.body);
    sessions[talk.getSessionIndexById()].addTalk(talk);
    res.redirect('/');
})

