const express = require('express');
const cors = require('cors');

const API_PORT = process.env.PORT || 4444;
const app = express();
app.use(cors());

const mainRouter = require('./routers/main.router');
const adminRouter = require('./routers/admin.router');

app.use('/', mainRouter);
app.use('/admin', adminRouter);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT} `));
