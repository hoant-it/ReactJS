const express = require('express');
const cors = require('cors');
const db = require('./dbFile/dbUserList');

const API_PORT = process.env.PORT || 4444;
const app = express();

app.use(cors());

app.get('/api', async (req, res) => {
  try {
    const userList = await db.getUserList();
    res.json({
      data: userList,
    });
  } catch (error) {
    throw error;
  }
  // console.log('called');
  // res.send({ result: 'hello' });
});

app.get('/quit', async (req, res) => {
  console.log('called quit');
  res.send({ result: 'good bye' });
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT} `));
