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

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

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

app.post('/talks', async (req, res) => {
    const talk = new Talk(req.body);
    await talkRepository.save(talk._sessionId, talk);
    res.redirect('/');
});

sessionRepository.save(new Session({title: 'foo', startTime: '10:10'}))