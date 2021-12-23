const express = require('express');
const app = express();

// public というフォルダに入れられた静的ファイルはそのまま表示
app.use(express.static(__dirname + '/public'));

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/clickup/webhook', function(req, res) {
  // console.log('/clickup/webhook');
  // console.log(req.body);
  console.log(req.body.payload.text_content);
  res.end();
});
app.listen(3000);

console.log('server start on port 3000!');