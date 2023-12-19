var express = require('express');
var router = express.Router();


// 게시글 정보관리 라우팅 기능 제공


/*
-게시글 리스트 페이지 호출
호출 주소 : http://localhost:3001/article/list
GET
*/
router.get('/list',function(req,res){
  
  var article = [
    {
      article_id:1,
      title:"게시판1 제목",
      reg_member_id:"A",
      contents:"게시판1 내용",
      board_type_code:1,
      article_type_code:1,
      ip_adress:"111.111.111.111",
      reg_date:Date.now(),
      view_count:100,
      is_display_code:1
    },
    {
      article_id:2,
      title:"게시판2 제목",
      reg_member_id:"B",
      contents:"게시판2 내용",
      board_type_code:2,
      article_type_code:2,
      ip_adress:"222.111.111.111",
      reg_date:Date.now(),
      view_count:200,
      is_display_code:2
    },
    {
      article_id:3,
      title:"게시판3 제목",
      reg_member_id:"C",
      contents:"게시판3 내용",
      board_type_code:2,
      article_type_code:2,
      ip_adress:"123.111.111.111",
      reg_date:Date.now(),
      is_display_code:1,
      view_count:300
    },
  ]


  res.render('article/list', {article});
});


/*
-게시글 생성 페이지 호출
호출 주소 : http://localhost:3001/article/create
GET
*/
router.get('/create',function(req,res){
  res.render('article/create');
});


/*
-게시글 생성 페이지 정보 데이터 요청과 응답, 목록페이지 이동
호출 주소 : http://localhost:3001/article/create
POST
*/
router.post('/create',function(req,res){
  // 요청 데이터 받기
  var contents = req.body.artContents;
  var title = req.body.artTitle;
  
  
  // 요청 데이터 DB 저장
  var article = [
    {
      contents,
      title,
      articleId:1
    }
  ]

  res.redirect('/article/list');
});


/*
-게시글 수정 페이지 호출
호출 주소 : http://localhost:3001/article/modify
GET
*/
router.get('/modify/:artId',function(req,res){

  // 파라미터 방식으로 요청 데이터 id 받기 
  var articleId = req.params.artId;
  

  // 수정 전 데이터 DB 에서 불러오기
  var article = {
    article_id:1,
    title:"게시판1 제목",
    reg_member_id:"A",
    contents:"게시판1 내용",
    board_type_code:1,
    article_type_code:1,
    ip_adress:"111.111.111.111",
    reg_date:Date.now(),
    view_count:100,
    is_display_code:1
  }


  res.render('article/modify', {article});
});


/*
-게시글 수정 페이지 게시글 데이터 수정 요청과 응답, 리스트 페이지 이동
호출 주소 : http://localhost:3001/article/modify
POST
*/
router.post('/modify/:artId',function(req,res){
  // 수정 요청 데이터 받기
  var contents = req.body.contents;
  var title = req.body.title;
  

  // 수정 요청 데이터 DB 보내기
  var article = [
    {
      contents,
      title
    }
  ]

  res.redirect('/article/list');
});


/*
-게시글 삭제 페이지 요청과 응답
호출 주소 : http://localhost:3001/article/delete
GET
*/
router.get('/delete',function(req,res){
  // 삭제할 데이터 id 요청 받기
  var artId = req.body.articleId;

  // 삭제할 데이터 id DB에서 찾은 후 삭제

  res.redirect('/article/list');
});




module.exports = router;
