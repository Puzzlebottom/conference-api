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


const session = await sessionRepository.findSessionById(0);





