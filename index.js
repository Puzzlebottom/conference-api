import express from "express"
import path from "path"
import moment from "moment"
import bodyParser from "body-parser"
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
    // console.log(req.body);
    const session = new Session(req.body);
    sessions.push(session);
    // console.log(sessions);
    res.redirect('/');
});

// app.post('/talks', (req, res) => {
//     console.log(req.body);
//     const talk = new Talk(req.body);
//     sessions[parseInt(req.body.sessionIndex)].addTalk(talk);
//     res.redirect('/');
// })

