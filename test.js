import { database }  from "./database.js";
import { formatTalksIntoTemplate} from "./templates.js ";
import { Talk } from "./Talk.js";
import moment from "moment";
import {Session} from "./Session.js";
import {sessionRepository} from "./sessionRepository.js";
import {talkRepository} from "./talkRepository.js";

const id = 4;
const sessionId = 0;
const sessionData = [{title: 'testTitle', starttime: '9:00 am'}];

const essionTemplate = `<section class="session">
    <h2>%title%</h2>
    <ul>
    %talk%  
    </ul>
    <h3>Duration: %duration%</h3>
</section>`;

const session = await sessionRepository.findSessionById(0);

export const renderSession = async (session) => {
    const allTalks = await talkRepository.findAllBySessionId(session._id);
    const noTalks = await allTalks.length === 0;
    const duration = noTalks ? '' : await session.formatDurationIntoHoursAndMinutes();
    const talks = noTalks ? '' : formatTalksIntoTemplate(await talkRepository.findAllBySessionId(session._id));
    return sessionTemplate.replace('%title%', session.getSessionTitle())
        .replace('%duration%', duration)
        .replace('%talk%', talks);
}

await console.log(await renderSession(session));




