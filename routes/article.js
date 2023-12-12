// 게시글 정보관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

const articles = [
  {
    article_id: 1,
    title: '아침 뭐먹지',
    contents: '김밥이랑 짜파게티중 뭐먹지',
    view_count: 0,
  },
  {
    article_id: 2,
    title: '점심 뭐먹지',
    contents: '삼겹살먹을까',
    view_count: 0,
  },
  {
    article_id: 3,
    title: '저녁 뭐먹지',
    contents: '굶을까',
    view_count: 0,
  },
];

/* GET home page. */
router.get('/list', function (req, res, next) {
  res.render('article/list', { articles });
});

router.get('/create', function (req, res, next) {
  res.render('article/create', { title: 'Express' });
});

router.post('/create', function (req, res, next) {
  res.redirect('/article/list');
});

router.get('/modify', function (req, res, next) {
  res.render('article/modify', { title: 'Express' });
});

router.post('/modify', function (req, res, next) {
  res.redirect('/list');
});

router.get('/delete', function (req, res, next) {
  res.redirect('/article/list');
});

module.exports = router;
