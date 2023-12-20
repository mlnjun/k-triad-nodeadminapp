// 관리자 사이트 관리자 계정 정보관리 라우팅 기능 제공

var express = require("express");
var router = express.Router();

const adminList = [
  {
    admin_member_id: 1,
    company_code: 100,
    admin_id: "NARA",
    admin_password: "nara123",
    admin_name: "백나라",
    email: "nara@naver.com",
    telephone: "0101231234",
    dept_name: "aa",
    used_yn_code: 1,
    reg_user_id: 1,
    edit_user_id: 1,
    edit_date: "2022-01-01",
    reg_date: "2022-01-01",
  },
  {
    admin_member_id: 2,
    company_code: 200,
    admin_id: "COCO",
    admin_password: "coco123",
    admin_name: "코코",
    email: "coco@naver.com",
    telephone: "01011111111",
    dept_name: "bb",
    used_yn_code: 0,
    reg_user_id: 2,
    edit_user_id: 2,
    edit_date: "2022-01-02",
    reg_date: "2022-01-02",
  },
  {
    admin_member_id: 3,
    company_code: 300,
    admin_id: "TOM",
    admin_password: "tom123",
    admin_name: "톰",
    email: "tom@naver.com",
    telephone: "0102222222",
    dept_name: "cc",
    used_yn_code: 1,
    reg_user_id: 3,
    edit_user_id: 3,
    edit_date: "2022-01-03",
    reg_date: "2022-01-03",
  },
];

/* GET home page. */
router.get("/list", function (req, res, next) {
  res.render("admin/list", { adminList, searchOption: {} });
});

router.post("/list", function (req, res, next) {
  const { admin_name, admin_id, used_yn_code } = req.body;

  const searchOption = {
    admin_name,
    admin_id,
    used_yn_code,
  };

  const adminList = [
    {
      admin_member_id: 1,
      company_code: 100,
      admin_id: "NARA",
      admin_password: "nara123",
      admin_name: "백나라",
      email: "nara@naver.com",
      telephone: "0101231234",
      dept_name: "aa",
      used_yn_code: 1,
      reg_user_id: 1,
      edit_user_id: 1,
      edit_date: "2022-01-01",
      reg_date: "2022-01-01",
    },
  ];

  res.render("admin/list", { adminList, searchOption });
});

router.get("/create", function (req, res, next) {
  res.render("admin/create", { title: "Express" });
});

router.post("/create", function (req, res, next) {
  res.redirect("/admin/list");
});

router.get("/modify/:aid", function (req, res, next) {
  res.render("admin/modify", { admin: adminList[0] });
});

router.post("/modify/:aid", function (req, res, next) {
  res.redirect("/admin/list");
});

router.get("/delete", function (req, res, next) {
  const adminIdx = req.query.aid;
  res.redirect("/admin/list");
});

module.exports = router;
