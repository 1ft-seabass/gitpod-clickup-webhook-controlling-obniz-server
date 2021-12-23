const express = require('express');
const app = express();
const axios = require('axios');

const urlDiscordWebHook = '<DiscordWebHook>';
// public というフォルダに入れられた静的ファイルはそのまま表示
app.use(express.static(__dirname + '/public'));

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/clickup/webhook', async function(req, res) {
  console.log('/clickup/webhook');

  console.log('タスクのタイトル');
  console.log(req.body.payload.name);
  console.log('メッセージ内容');
  console.log(req.body.payload.text_content);

  const payload = {
    "content":req.body.payload.text_content
  };

  const response = await axios.post(urlDiscordWebHook,payload);
  console.log('response');
  console.log(response.data);

  res.end();
});

app.listen(3000);

console.log('server start on port 3000!');