import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { User } from '../models';

const Locals = () => {
  passport.use(new Strategy({
    // 'email'과 'password'는 프론트 saga에서 보내준 값.
    // 보내준 값이 id면 그걸로 바뀌어야 함.
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try{
      // 일치하는 유저가 있는지 DB랑 확인
      const user = await User.findOne({
        where: {
          email
        }
      })

      // 예외처리1: 일치하지 않는 유저
      if(!user) {
        return done(null, false, { reason: '없는 사용자입니당'})
      }
      console.log("로그인 시도하는 유저의 PW ", password)
      console.log("실제 유저의 PW ", user.password)
      
      const result = await bcrypt.compare(password, user.password)
      if(result){
        return done(null, user)
      }
      // 예외처리2 : 비밀번호 틀린 경우
      return done(null, false, { reason: '비밀번호가 틀렸슴다'})

    } catch(e) {
      console.error(e);
      return done(e);
    }
  }))
}

export default Locals