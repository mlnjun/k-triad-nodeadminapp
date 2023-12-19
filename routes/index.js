var express = require('express');
var router = express.Router();


/*
-메인 페이지 요청 라우팅 메소드
-호출 주소 : http://localhost:3001
*/
router.get('/', function(req, res, next) {
  res.render('index');
});


/*
-로그인 페이지 요청 라우팅 메소드
-호출 주소 : http://localhost:3001/login
*/
router.get('/login', async(req,res)=>{
  res.render('login', { layout: false });
});


/*
-로그인 페이지 요청과 응답 라우팅 메소드
-호출 주소 : http://localhost:3001/login
*/
router.post('/login',async(req,res)=>{
  var adminId = req.body.aid;
  var adminPassword = req.body.apassword;
  var adminName = req.body.aname;

  var admin_member = [
    {
      admin_id:"asd123",
      admin_password:"asd123",
      admin_name:'A',
      email:"asd123@gmail.com",
      reg_date:Date.now(),
      company_code:1
    },
    {
      admin_id:"qwe456",
      admin_password:"qwe456",
      admin_name:'B',
      email:"asd123@gmail.com",
      reg_date:Date.now(),
      company_code:2
    },
    {
      admin_id:"zxc123",
      admin_password:"zxc123",
      admin_name:'C',
      email:"asd123@gmail.com",
      reg_date:Date.now(),
      company_code:1
    }
  ]

  res.redirect('http://localhost:3001');
});




module.exports = router;
