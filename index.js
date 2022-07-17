import { wiki } from './server_modules/wiki_api/main_wiki_call.js';

import express from 'express';
const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

let item;

app.post('/api', async (request, response) => {
  console.log('api - I got a request!');
  const title = request.body.search;
  console.log(title);
  const data = await wiki().dataWiki(title);
  console.log('print dei dati sul server:  \n', data);
  console.log(Object.keys(data).length);
  response.json(data);
});

app.post('/databot', async (request, response) => {
  console.log('databot - I got a request!');
  item = request.body;
  //const item = request.body;
  console.log(item);
});

app.get('/initBot', (request, response) => {
  console.log('prendi - I got a request!');
  response.json({
                  title: item.title, 
                  description: item.description, 
                  imageName: item.imageName, 
                  imageSource: item.imageSource, 
                  abstract: item.abstract
                });
  console.log(item);
});

app.post('/chatBot', (request, response) => {
  console.log('prendi - I got a request!');
  const title = request.body.text;
  console.log(title)
  let answer = {text: 'this is the answer'}
  response.json(answer);
});
