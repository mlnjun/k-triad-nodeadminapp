
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.render('message/list');
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

  res.redirect('/message/list');
});

module.exports = router;
