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

const renderSession = (session) => {
    if (session._talks.length === 0) {
        return sessionTemplate.replace('%title%', session.getSessionTitle()).replace('%duration%', '0').replace('%talk%', '');
    } else {
        return sessionTemplate.replace('%title%', session.getSessionTitle()).replace('%duration%', session.getSessionDuration()).replace('%talk%', session.getSessionTalks());
    }
}
const renderDropdownOptions = (session) => {
    return session.getSessionDropdownOption();
}

export const renderPage = (sessions) => {
    const renderedSessions = sessions.map(session => renderSession(session)).join('');
    const renderedDropdownOptions = sessions.map(session => renderDropdownOptions(session)).join('');
    if(sessions.length === 0) {
        return pageTemplate.replace('%sessions%', '').replace('%options%', '');
    } else {
        return pageTemplate.replace('%sessions%', renderedSessions).replace('%options%', renderedDropdownOptions)
    }
}
