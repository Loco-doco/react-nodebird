import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models'

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /user
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

export default router;