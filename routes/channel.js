// 채팅방 정보관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

const channelList = [
  {
    channel_id: 1,
    channel_name: '거지방',
    channel_desc: '알뜰한 지출을 공유하는 방',
    user_limit: 80,
  },
  {
    channel_id: 2,
    channel_name: '커사모(커피를 사랑하는 모임)',
    channel_desc: '커피러버들의 채팅방',
    user_limit: 80,
  },
  {
    channel_id: 3,
    channel_name: '다이어트',
    channel_desc: '다이어트 꿀팁 공유 채팅방',
    user_limit: 100,
  },
];

router.get('/list', function (req, res, next) {
  res.render('channel/list', { channelList });
});

router.get('/create', function (req, res, next) {
  res.render('channel/create', { title: 'Express' });
});

router.post('/create', function (req, res, next) {
  res.redirect('/channel/list');
});

router.get('/modify', function (req, res, next) {
  res.render('channel/modify', { title: 'Express' });
});

router.post('/modify', function (req, res, next) {
  res.redirect('/channel/list');
});

router.get('/delete', function (req, res, next) {
  res.redirect('/channel/list');
});

module.exports = router;
