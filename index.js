const express = require('express');
const path = require('path');
// const session = require('./Session');
// const talk = require('./Talk');

const app = express();

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'conference-ui.html'));
// });

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));