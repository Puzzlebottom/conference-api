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
    <section class="session">
        <h2>Some session</h2>
        <ul>
            <li><span>9:00 AM</span>Something 60m</li>
            <li><span>10:00 AM</span>Something 15m</li>
        </ul>
        <h3>Duration: 1:15</h3>
    </section>
    <section class="session">
        <h2>Another session</h2>
        <ul>
            <li><span>9:00 AM</span>Something 60m</li>
            <li><span>10:00 AM</span>Something 15m</li>
            <li><span>10:15 AM</span>Something 45m</li>
            <li><span>11:00 AM</span>Something 15m</li>
        </ul>
        <h3>Duration: 1:15</h3>
    </section>
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
    <label>Session: <select name="sessionIndex">
        <option value="1">Some session</option>
        <option value="2">Another session</option>
    </select></label>
    <input type="submit" value="Save"/>
</form>
</body>
</html>`;


const sessionTemplate = `<section class="session">
    <h2>%title%</h2>
</section>`;

const renderSession = (session) => {
    return sessionTemplate.replace('%title%', session.title);
}

export const renderPage = (sessions) => {
    const renderedSessions = sessions.map(session => renderSession(session)).join('');

    return pageTemplate.replace('%sessions%', renderedSessions);
}
