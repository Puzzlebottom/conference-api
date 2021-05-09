import express from "express"
import bodyParser from "body-parser"
import { renderPage } from "./templates.js"
import { loggerMiddleware } from "./loggerMiddleware.js"
import { sessionRepository } from "./sessionRepository.js";
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

app.get('/', async (req, res) => {
    await res.send(await renderPage());
});

app.post('/sessions', async (req, res) => {
    await sessionRepository.save(req.body);
    await res.redirect('/');
});

app.post('/talks', async (req, res) => {
    await talkRepository.save(req.body);
    await res.redirect('/');
});


//remove the brackets around knex requests.  and solve that error.