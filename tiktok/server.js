const express = require('express');
const cors = require('cors');

const API_PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());

app.get('/api', async (req, res) => {
  console.log('called');
  res.send({ result: 'hello' });
});

app.get('/quit', async (req, res) => {
  console.log('called quit');
  res.send({ result: 'good bye' });
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT} `));
