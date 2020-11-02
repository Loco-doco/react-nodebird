import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { User, Post } from '../models';
import { isLoggedIn, isNotLoggedIn } from './middlewares';

const router = express.Router();

// login API
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (e, user, info) => { // done의 매개변수들
    // 예외처리1: 예측 못한 에러가 있는 경우
    if (e) {
      console.error(e);
      return next(e);
    }

    // 예외처리2: passport에서 예외처리한 예외사항 발생하는 경우
    if(info){ // info = 3번째 자리(reason)
      return res.status(401).send(info.reason)
    }

    // 성공하면 로그인
    return req.login(user, async (loginError) => {
      // passport 단의 에러가 발생하는 경우
      if (loginError){
        return next(loginError);
      }

      const loginDoneUser = await User.findOne({
        where: {id: user.id},
        attributes: { // 제외할 컬럼
          exclude: ['password']
        },
        include: [{ // 추가로 포함시킬 컬럼 with 관계 테이블
          model: Post
        },{
          model: User,
          as: 'Followers'
        },{
          model: User,
          as: 'Followings'
        }]
      })

      // console.log("login Success user =", loginDoneUser)
      // 사용자 정보 넘겨줌
      return res.status(200).json(loginDoneUser)
    })
  })(req, res, next)
});

// signupAPI
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
  try{
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    })

    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디')
    }

    if(req.body.nickname.length > 14){
      console.log("췍췍")
      return res.status(403).send('닉네임이 너무 길어염')
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPw,
    })
    res.status(200).send('OK')

  } catch (e) {
    console.error(e);
    next(e) // status 500
  }
})

// logout API
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('OK');
})

export default router;