var express = require('express');
var router = express.Router();

var db = require('../models/index');


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
  res.render('login', { layout: false, resultMsg:""});
});


/*
-로그인 페이지 요청과 응답 라우팅 메소드
-호출 주소 : http://localhost:3001/login
*/
router.post('/login',async(req,res)=>{
  var admin_id = req.body.admin_id;
  var admin_password = req.body.admin_password;


  // DB에서 해당 id 정보 찾기
  var admin_member = await db.Admin.findOne({where:{admin_id:admin_id}});


  let resultMsg = "";

  if(admin_member == null){
    // 아이디 틀림
    resultMsg = "해당 아이디가 존재하지 않습니다.";
  }else{
    if(admin_member.admin_password == admin_password){
      // 로그인 성공
      res.redirect('/');
    }else{
      // 비밀번호 틀림
      resultMsg = "해당 아이디의 비밀번호가 아닙니다.";
    }
  }


  if(resultMsg !== ""){
    res.render('login',{layout:false, resultMsg});
  }
});




module.exports = router;
