import express from "express"
import bodyParser from "body-parser"
import { renderPage } from "./templates.js"
import { loggerMiddleware } from "./loggerMiddleware.js"
import { Session } from "./Session.js"
import { sessionRepository } from "./sessionRepository.js";
import { Talk } from "./Talk.js"
import knexfile from "./knexfile.js";
import knex from "knex";
import { talkRepository } from "./talkRepository.js";
const config = knexfile[process.env.NODE_ENV || "development"];
const database = knex(config);

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send(renderPage(sessionRepository.findAll()));
});

app.post('/sessions', (req, res) => {
    const session = new Session(req.body);
    sessionRepository.save(session);
    res.redirect('/');
});

app.post('/talks', (req, res) => {
    const talk = new Talk(req.body);
    talkRepository.save(talk._assignedToSession, talk);
    res.redirect('/');
});
