import express from 'express';

const http = express();

http.get('/', (req, res) => {
  res.send('Hello World!');
});

export default http;
