var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index');

const passport = require(".");




module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField:"admin_id",
        passwordField:"admin_password"
      },
      async (adminId, adminPWD, done) => {

        try{
          // 입력 id admin 계정 정보 찾기
          const admin = await db.Admin.findOne({where:{admin_id:adminId}});

          // 계정 정보 존재시 로직
          if(admin){
            // 입력 PW 입력 ID 계정과 동일한지 확인 
            const comparedPWD = await bcrypt.compare(adminPWD, admin.admin_password);

            if(comparedPWD){
              // 로그인 성공
              // 세션 정보 객체 생성
              var sessionAdmin = {
                adminId,
                adminMemberId: admin.admin_member_id,
                adminName:admin.admin_name,
                email:admin.email,
                telephone:admin.telephone
              };

              // 세션 정보 보내주기
              done(null, sessionAdmin);
            }else{
              // PW 일치하지 않음
              done(null, false, {message: "비밀번호가 일치하지 않습니다."});
            }
          }else{
            // 입력 ID 계정 존재하지 않음
            done(null, false, {message: "해당 ID의 계정이 존재하지 않습니다."});
          }
        }catch(err){
          console.error(err);
          done(err);
        }

      }
    )
  );
};