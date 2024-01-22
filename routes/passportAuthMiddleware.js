

// 로그인 인증 확인
exports.isloggedIn = (req,res,next)=>{
  if(req.isAuthenticated){
    // 로그인 인증된 상태
    next();
  }else{
    // 비인증 상태
    res.redirect('/login');
  }
};


// 로그인 비인증 확인
exports.isNotLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated){
    // 비인증 상태
    next();
  }else{
    // 인증 상태
    res.redirect('/');
  }
};