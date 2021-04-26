import express from "express"
import path from "path"
import moment from "moment"
import bodyParser from "body-parser"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import {renderPage} from "./html.js"

const PORT = process.env.port || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send(renderPage(sessions));
});


export const sessions = [];

app.post('/sessions', (req, res) => {
    console.log(req.body);
    sessions.push(req.body);
    res.redirect('/');
});

