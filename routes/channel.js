// 채팅방 정보관리 라우팅 기능 제공

var express = require("express");
var router = express.Router();

const channelList = [
  {
    channel_id: 1,
    community_id: 2,
    channel_code: "친목",
    channel_name: "자바스크립트 스터디",
    channel_img_path: "/image/img.jpg",
    channel_desc: "자바스크립트 스터디 채팅방",
    channel_state_code: 1,
    reg_date: "2023-01-04",
    user_limit: 50,
    reg_member_id: 16,
    edit_date: "2023-01-10",
    edit_member_id: 16,
  },
  {
    channel_id: 2,
    community_id: 2,
    channel_code: "공유",
    channel_name: "거지방",
    channel_img_path: "/image/img2.jpg",
    channel_desc: "알뜰한 지출을 공유하는 방",
    channel_state_code: 1,
    user_limit: 60,
    reg_date: "2020-01-04",
    reg_member_id: 14,
    edit_date: "2020-01-10",
    edit_member_id: 14,
  },
  {
    channel_id: 3,
    community_id: 1,
    channel_code: "친목",
    channel_name: "삼합회",
    channel_img_path: "/image/img.jpg",
    channel_desc: "전국을 다스리는 삼합회 채팅방",
    channel_state_code: 0,
    user_limit: 100,
    reg_date: "2020-01-02",
    reg_member_id: 1,
    edit_date: "2020-01-05",
    edit_member_id: 1,
  },
];

router.get("/list", function (req, res, next) {
  res.render("channel/list", { channelList, searchOption: {} });
});

router.post("/list", function (req, res, next) {
  // step1: 사용자가 선택/입력한 조회옵션 데이터를 추출
  const { channel_name, reg_member_id, channel_state_code } = req.body;

  const searchOption = {
    channel_name,
    reg_member_id,
    channel_state_code,
  };

  // step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서 게시글 목록 재조회 해오기
  const channelList = [
    {
      channel_id: 3,
      community_id: 1,
      channel_code: "친목",
      channel_name: "삼합회",
      channel_img_path: "/image/img.jpg",
      channel_desc: "전국을 다스리는 삼합회 채팅방",
      channel_state_code: 0,
      user_limit: 100,
      reg_date: "2020-01-02",
      reg_member_id: 1,
      edit_date: "2020-01-05",
      edit_member_id: 1,
    },
  ];
  res.render("channel/list", { channelList, searchOption });
});

router.get("/create", function (req, res, next) {
  res.render("channel/create");
});

router.post("/create", function (req, res, next) {
  res.redirect("/channel/list");
});

router.get("/modify/:cid", function (req, res, next) {
  const channelIdx = req.params.cid;

  const channel = {
    channel_id: 3,
    community_id: 1,
    channel_code: "친목",
    channel_name: "삼합회",
    channel_img_path: "/image/img.jpg",
    channel_desc: "전국을 다스리는 삼합회 채팅방",
    channel_state_code: 0,
    user_limit: 100,
    reg_date: "2020-01-02",
    reg_member_id: 1,
    edit_date: "2020-01-05",
    edit_member_id: 1,
  };

  res.render("channel/modify", { channel });
});

router.post("/modify", function (req, res, next) {
  res.redirect("/channel/list");
});

router.get("/delete", function (req, res, next) {
  const articleIdx = req.query.cid;

  res.redirect("/channel/list");
});

module.exports = router;
