const express = require('express');
const app = express();
const axios = require('axios');
const Obniz = require('obniz');

// obniz の接続
// <OBNIZ_ID> に、自分の使う obniz の ID を入力
const obniz = new Obniz("<OBNIZ_ID>");

// obniz 接続後にメッセージをだす
obniz.onconnect = async function () {
  obniz.display.clear();
  obniz.display.print("Hello ClickUp!");
}

// public というフォルダに入れられた静的ファイルはそのまま表示
app.use(express.static(__dirname + '/public'));

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Clickup Webhook の受信
app.post('/clickup/webhook', async function(req, res) {
  console.log('/clickup/webhook');

  console.log('タスクのタイトル');
  console.log(req.body.payload.name);
  console.log('Discord メッセージ内容');
  console.log(req.body.payload.text_content);

  // ClickUp の Webhook データからタスク詳細のテキストをメッセージとして抽出
  const messageObnizDisplay = req.body.payload.text_content;

  // obniz のディスプレイにメッセージ反映
  obniz.display.clear();
  obniz.display.print(messageObnizDisplay);

  res.end();
});

app.listen(3000);

console.log('server start on port 3000!');