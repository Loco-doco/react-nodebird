import express from "express";
import cors from 'cors';
import db from './models';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passportConfig from './passport';

import postRouter from './routes/post'
import userRouter from './routes/user'

import dotenv from 'dotenv';

dotenv.config();
const app = express();

// db 연결(sequelize)
db.sequelize.sync()
  .then(()=> {
    console.log('db 연결 성공!!!')
  })
  .catch(console.error)

// passport 연결
passportConfig(); 

// CORS 에러 방지
app.use(cors({
  origin: true,
  credentials: false,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  resave: false,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("Hello World")
})

// Router 연결
app.use('/post', postRouter)
app.use('/user', userRouter)


app.listen(3065, () => {
  console.log("Server is running")
})