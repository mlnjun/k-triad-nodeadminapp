// 관리자 사이트 관리자 계정 정보관리 라우팅 기능 제공

var express = require("express");
var router = express.Router();

var db = require("../models/index");

// 담당 : 백나라
// http://localhost:3001/admin/list
router.get("/list", async function (req, res, next) {
  const adminList = await db.Admin.findAll();

  res.render("admin/list", { adminList, searchOption: {} });
});

router.post("/list", async function (req, res, next) {
  const { admin_name, admin_id, used_yn_code } = req.body;

  const searchOption = {
    admin_name,
    admin_id,
    used_yn_code: used_yn_code === "9" ? "" : used_yn_code,
  };

  const queryOptionObj = {};

  for (let key in searchOption) {
    if (searchOption[key]) {
      queryOptionObj[key] = searchOption[key];
    }
  }
  console.log("옵션!: ", queryOptionObj, searchOption);

  const adminList = await db.Admin.findAll({ where: queryOptionObj });

  res.render("admin/list", { adminList, searchOption });
});

// 담당 : 고민준
router.get("/create", async (req, res) => {
  res.render("admin/create");
});

var resultMsg = {
  code: 200,
  data: {},
  msg: "",
};

/*
-관리자 계정 생성페이지 계정생성 정보 요청과 응답
호출주소 : http://localhost:3001/admin/create
POST
*/
router.post("/create", async (req, res) => {
  try {
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var company_code = req.body.company_code;
    var telephone = req.body.telephone;
    var dept_name = req.body.dept_name;

    var admin_member = {
      company_code,
      admin_id,
      admin_password,
      admin_name,
      email,
      telephone,
      dept_name,
      used_yn_code: 1,
      reg_user_id: 1,
      reg_date: Date.now(),
    };

    await db.Admin.create(admin_member);

    code = 200;
    data = admin_member;
    msg = "새 관리자 등록 완료";

    res.redirect("/admin/list");
  } catch (err) {
    code = 500;
    data = null;
    msg = "서버 관리자에게 문의하세요";
  }
});

/*
-관리자 계정 수정 페이지 호출
호출주소 : http://localhost:3001/admin/modify/A
GET
*/
router.get("/modify/:aid", async (req, res) => {
  var admin_member_id = req.params.aid;

  // admin id 데이터로 DB정보 찾기
  var admin_member = await db.Admin.findOne({
    where: { admin_member_id: admin_member_id },
  });

  res.render("admin/modify", { admin_member });
});

/*
-관리자 계정 수정 페이지 수정 데이터 요청과 응답
호출주소 : http://localhost:3001/admin/modify
POST
*/
router.post("/modify/:aid", async (req, res) => {
  // 입력 받기
  var admin_member_id = req.params.aid;
  var admin_id = req.body.admin_id;
  var admin_password = req.body.admin_password;
  var admin_name = req.body.admin_name;
  var email = req.body.email;
  var company_code = req.body.company_code;
  var telephone = req.body.telephone;
  var dept_name = req.body.dept_name;

  // 받은 입력 객체로 만들기
  var admin_member = {
    company_code,
    admin_id,
    admin_password,
    admin_name,
    email,
    telephone,
    dept_name,
    used_yn_code: 1,
    reg_user_id: 1,
    reg_date: Date.now(),
    edit_user_id: 2,
    edit_date: Date.now(),
  };

  // DB 데이터 수정하기
  await db.Admin.update(admin_member, { where: { admin_member_id } });

  res.redirect("/admin/list");
});

// 담당 : 이용혁
router.get("/delete", async (req, res) => {
  try {
    const { admin_id } = req.query;

    const result = await db.Admin.destroy({ where: { admin_id } });

    if (result) {
      res.send("관리자 계정이 삭제되었습니다.");
    } else {
      res.status(400).send("관리자 계정 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error("관리자 계정 삭제 중 오류 발생:", error);
    res.status(500).send("내부 서버 오류");
  }
});

module.exports = router;
