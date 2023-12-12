
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.render('member/list');
});


router.get('/create', (req, res) => {
  res.render('member/create');
});


router.post('/create', (req, res) => {

  res.redirect('/member/list');
});

router.get('/modify', (req, res) => {
  res.render('member/modify');
});

router.post('/modify', (req, res) => {

  res.redirect('/member/list');
});
module.exports = router;