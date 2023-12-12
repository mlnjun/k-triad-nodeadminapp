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
  res.render('login');
});


/*
-로그인 페이지 요청과 응답 라우팅 메소드
-호출 주소 : http://localhost:3001/login
*/
router.post('/login',async(req,res)=>{
  var adminId = req.body.aid;
  var adminPassword = req.body.apassword;
  var adminName = req.body.aname;

  var adminMember = [
    {
      adminId,
      adminPassword,
      adminName
    }
  ]

  res.redirect('/');
});




module.exports = router;
