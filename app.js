import express from "express"
import bodyParser from "body-parser"
import {renderPage} from "./templates.js"
import {sessionRepository} from "./sessionRepository.js";
import {talkRepository} from "./talkRepository.js";
import {Talk} from "./Talk.js";
import {Session} from "./Session.js";
import morgan from "morgan"

export const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/scripts/react', express.static('node_modules/react/umd'));
app.use('/scripts/react-dom', express.static('node_modules/react-dom/umd'));
app.use('/scripts/babel-standalone', express.static('node_modules/babel-standalone'));
app.use('/scripts/axios', express.static('node_modules/axios/dist'));
app.use('/scripts/moment', express.static('node_modules/moment'));
app.use('/scripts/uuid', express.static('node_modules/uuid/dist/umd'));

const wrapAsyncRoute = (controllerFunc) => async (req, res, next) => {
    try {
        await controllerFunc(req, res, next)
    } catch (e) {
        next(e)
    }
}

app.get('/', wrapAsyncRoute(async (req, res) => {
    await res.send(await renderPage());
}));

app.post('/sessions', wrapAsyncRoute(async (req, res) => {
    await sessionRepository.save(req.body);
    await res.redirect('/');
}));

app.post('/talks', wrapAsyncRoute(async (req, res) => {
    await talkRepository.save(req.body);
    await res.redirect('/');
}));

app.get('/api/sessions', wrapAsyncRoute(async (req, res) => {
    res.send(await sessionRepository.load())
}));

app.get('/api/talks', wrapAsyncRoute(async (req, res) => {
    res.send(await talkRepository.load())
}));

app.post('/api/sessions', wrapAsyncRoute(async (req, res) => {
    const session = new Session(req.body);
    if (await session.isValid()) {
        await sessionRepository.save(req.body);
        res.send({});
    } else {
        res.status(400).send({error: session.getValidationError()});
    }
}));

app.post('/api/talks', wrapAsyncRoute(async (req, res) => {
    const talk = new Talk(req.body);
    if (await talk.isValid()) {
      await talkRepository.save(req.body);
      res.send({});
    } else {
      res.status(400).send({error: talk.getValidationError()});
    }
}));
