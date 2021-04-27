import express from "express"
import path from "path"
import moment from "moment"
import bodyParser from "body-parser"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { renderPage } from "./html.js"
import { assignSessionIndex } from "./html.js"
import { loggerMiddleware } from "./loggerMiddleware.js"

const PORT = process.env.port || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send(renderPage(sessions));
});


const sessions = [];
const talks = []

app.post('/sessions', (req, res) => {
    console.log(req.body);
    sessions.push(req.body);
    res.redirect('/');
});

app.post('/talks', (req, res) => {
    console.log(req.body);
    talks[assignSessionIndex(req.body)].push(req.body);
    res.redirect('/');
})

