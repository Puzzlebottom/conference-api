import { talkRepository } from "./talkRepository.js";
import {sessionRepository} from "./sessionRepository.js";

const pageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
        <title>Conference Track Management</title>
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

export const renderTalks = async (talks) => {
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

export const renderSession = async (session) => {
    const id = await session.getId();
    const allTalks = await talkRepository.findAllBySessionId(id);
    const noTalks = await allTalks.length === 0;
    const duration = noTalks ? '' : await session.formatDurationIntoHoursAndMinutes();
    const talks = noTalks ? '' : await renderTalks(allTalks);
    return sessionTemplate.replace('%title%', session.getSessionTitle())
        .replace('%duration%', duration)
        .replace('%talk%', talks);
}

export const renderPage = async () => {
    const allSessions = await sessionRepository.findAll();
    const noSessions = await allSessions.length === 0;
    let renderedSessions = '';
    let renderedDropdownOptions = '';
    for await (const session of allSessions) {
        const renderedSession = await renderSession(session);
        const renderedDropdownOption = await session.getSessionDropdownOption();
        renderedSessions += renderedSession;
        renderedDropdownOptions += renderedDropdownOption;
    }
    const compiledSessions = noSessions ? '' : renderedSessions;
    const compiledOptions = noSessions ? '' : renderedDropdownOptions;
    return pageTemplate.replace('%sessions%', compiledSessions)
        .replace('%options%', compiledOptions);
}


