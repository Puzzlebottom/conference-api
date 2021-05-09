import { talkRepository } from "./talkRepository.js";
import {sessionRepository} from "./sessionRepository.js";

const pageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
        <title>Conference Track Management</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" integrity="sha512-n/4gHW3atM3QqRcbCn6ewmpxcLAHGaDjpEBu4xZd47N0W2oQ+6q7oc3PXstrJYXcbNU1OHdQ1T7pAP+gi5Yu8g==" crossorigin="anonymous"></script>
        <script type="text/javascript" src="./index.js"></script>
        <link rel="stylesheet" href="css/style.css"/>
</head>
<body>
<div class="sessions-wrapper">
    %sessions%
</div>

<form method="post" action="/sessions">
    <h4>Add new session</h4>
    <label>Title: <input type="text" name="title"/></label>
    <label>Start time: <input type="time" name="startTime"/></label>
    <input type="submit" value="Save"/>
</form>

<form method="post" action="/talks">
    <h4>Add new track</h4>
    <label>Title: <input type="text" name="title"/></label>
    <label>Duration: <input type="number" name="duration"/></label>
    <label>Session: <select name="sessionId">
        %options%
    </select></label>
    <input type="submit" value="Save"/>
</form>
</body>
</html>`;

const sessionTemplate = `<section class="session">
    <h2>%title%</h2>
    <ul>
    %talk%  
    </ul>
    <h3>Duration: %duration%</h3>
</section>`;

export const formatTalksIntoTemplate = async (talks) => {
    const talkTemplate = `<li><span>%timeOfTalk%</span>%title%</li>`;
    let result = '';
    for await (const talk of talks) {
        const duration = await talk.getDuration();
        const title = await talk.getTitle();
        const startTime = await talk.getTalkStartTime();
        result += talkTemplate.replace('%timeOfTalk%', '' + startTime)
            .replace('%title%', title + ' ' + duration + ' m');

    }
    return result;
}
//
// export const renderSession = async (session) => {
//     const noTalks = await talkRepository.findAllBySessionId(session._id).length === 0;
//     const duration = noTalks ? '' : await session.formatDurationIntoHoursAndMinutes();
//     const talks = noTalks ? '' : formatTalksIntoTemplate(await talkRepository.findAllBySessionId(session._id));
//
//     return sessionTemplate.replace('%title%', session.getSessionTitle())
//         .replace('%duration%', duration)
//         .replace('%talk%', talks);
// }

const renderDropdownOptions = (session) => {
    return session.getSessionDropdownOption();
}

// export const renderPage = async () => {
//     const allSessions = await sessionRepository.findAll();
//     const renderedSessions = await allSessions.map(session => renderSession(session));
//         }



    // const renderedSessions = sessions.map(session => renderSession(session)).join('');
    // const renderedDropdownOptions = sessions.map(session => renderDropdownOptions(session)).join('');
    // const noSessions = sessions.length === 0;
    // const session = noSessions ? '' : renderedSessions;
    // const options = noSessions ? '' : renderedDropdownOptions;
    //
    //     return pageTemplate.replace('%sessions%', session)
    //         .replace('%options%', options)

