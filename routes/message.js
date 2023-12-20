const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  const messages = [];
  res.render('message/list', { messages });
});


router.get('/create', (req, res) => {
  res.render('message/create');
});


router.post('/create', (req, res) => {
  res.redirect('/message/list');
});

router.get('/modify', (req, res) => {
  res.render('message/modify');
});

router.post('/modify', (req, res) => {
  res.redirect('/message/list');
});

router.get('/delete', (req, res) => {
  res.render('message/delete');
});

router.post('/delete', (req, res) => {
  res.redirect('/message/list');
});

module.exports = router;
