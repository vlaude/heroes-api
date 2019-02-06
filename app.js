const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on port 3000 ...');
});
