const express = require('express');
const router = express.Router();

const db = require('../models/index');


router.get('/list', async(req, res) => {

  const memberList = await db.Member.findAll();

  res.render('member/list', { memberList });
});


router.get('/create', async(req, res) => {
  res.render('member/create');
});


router.post('/create', async(req, res) => {
  let email = req.body.email;
  let member_password = req.body.member_password;
  let name = req.body.name;
  let profile_img_path = req.body.profile_img_path
  let telephone = req.body.telephone;
  let entry_type_code = req.body.entry_type_code;
  let birth_date = req.body.birth_date;


  const newMember = {
    email,
    member_password,
    name,
    profile_img_path,
    telephone,
    entry_type_code,
    use_state_code:1,
    birth_date,
    reg_date:Date.now(),
    reg_member_id:1
  }


  await db.Member.create(newMember);


  res.redirect('/member/list');
});


router.get('/modify', async(req, res) => {
  res.render('member/modify');
});


router.post('/modify', async(req, res) => {
  res.redirect('/member/list');
});


router.get('/delete', async(req, res) => {
  res.render('member/delete');
});

router.post('/delete', async(req, res) => {
  res.redirect('/member/list');
});


module.exports = router;
