const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 環境変数 PASSWORD が設定されている場合のみBasic認証を有効化
if (process.env.PASSWORD) {
  app.use(basicAuth({
    users: { 'sodakun': process.env.PASSWORD },
    challenge: true,
    realm: 'Sodakun Prototype',
  }));
}

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
