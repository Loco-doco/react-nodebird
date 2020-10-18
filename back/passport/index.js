import passport from 'passport';
import local from './local';
import { User } from '../models';

const Passport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async(id, done) => {
    try{
      const user = await User.findOne({where: { id }});
      done(null, user)
    } catch(e) {
      console.error(e)
      done(e)
    }
  })

  local();
}

export default Passport;