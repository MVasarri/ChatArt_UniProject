import { wiki } from './server_modules/wiki_api/main_wiki_call.js';

import { join, resolve } from 'path';
import https from 'https';
import { createServer } from 'http';
import express from 'express';

const app = express();
const server = createServer(app);
import fetch from 'node-fetch';

// Set static folder
app.use(express.static(join(__dirname, '/dist')));
app.use(express.json());

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
);

app.get('/home', (req, res) => {
  res.sendFile(resolve(__dirname + '/dist/index.html'))
});

app.post('/api', async (request, response) => {
  console.log('I got a request!');
  const title = request.body.search;
  console.log(title);
  const data = await wiki().dataWiki(title);
  console.log(data);
  response.json(data);
});
