const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || 'sodakun-secret';

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24時間
}));

// ログイン画面
app.get('/login', (req, res) => {
  if (req.session.authenticated) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'login.html'));
});

// ログイン処理
app.post('/login', (req, res) => {
  if (!PASSWORD || req.body.password === PASSWORD) {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    res.redirect('/login?error=1');
  }
});

// ログアウト
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// 認証ミドルウェア（PASSWORDが設定されている場合のみ有効）
app.use((req, res, next) => {
  if (!PASSWORD || req.session.authenticated) return next();
  res.redirect('/login');
});

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
