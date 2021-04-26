import express from "express"
import path from "path"
import moment from "moment"
import bodyParser from "body-parser"
import {html} from "./html.js"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const PORT = process.env.port || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send(html);
});

app.post('/sessions', (req, res) => {
    console.log(req.body);
    array.push(req.body);
    res.redirect('/');
});

const array = [];


//
// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
//     next();
// };
//
// app.use(logger);