import {assignNewTalk, getTotalDurationOfTalks, Session} from "./Session.js";
import {Talk} from "./Talk.js";
import {sessionRepository} from "./sessionRepository.js";
import {talkRepository} from "./talkRepository.js";

const session = new Session({title: 'sdfsdf', startTime: '9:00'});
const talk = new Talk({title: 'sdfsdf', duration: '5', sessionId: session._id});
const talk2 = new Talk({title: 'sdfsdf', duration: '105', sessionId: session._id});

sessionRepository.save(session);
assignNewTalk(talk);
assignNewTalk(talk2);

console.log(getTotalDurationOfTalks(session._id));