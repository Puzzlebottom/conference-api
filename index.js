import express from "express"
import bodyParser from "body-parser"
import { renderPage } from "./html.js"
import { loggerMiddleware } from "./loggerMiddleware.js"
import { Session } from "./Session.js"
import { Talk } from "./Talk.js"
import { sessions } from "./Session.js"
import { assignNewTalk } from "./Session.js"

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
    res.send(renderPage(sessions));
});

app.post('/sessions', (req, res) => {
    const session = new Session(req.body);
    sessions.push(session);
    res.redirect('/');
});

app.post('/talks', (req, res) => {
    const talk = new Talk(req.body);
    assignNewTalk(talk);
    res.redirect('/');
});

