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

  // タスクのタイトル
  const taskTitle = req.body.payload.name;
  console.log('タスクのタイトル');
  console.log(taskTitle);

  // ClickUp の Webhook データからタスク詳細のテキストをメッセージとして抽出
  const messageObnizDisplay = "[ClickUp Task]\n" + taskTitle + "\nCompleted!";

  // obniz のディスプレイにメッセージ反映
  obniz.display.clear();
  obniz.display.print(messageObnizDisplay);

  res.end();
});

app.listen(3000);

console.log('server start on port 3000!');