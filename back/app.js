import express from "express";
// const express = require('express');
import postRouter from './routes/post'
// const postRouter = require('./routes/post');
import db from './models';
// const db = require('./models')

const app = express();

db.sequelize.sync()
  .then(()=> {
    console.log('db 연결 성공!!!')
  })
  .catch(console.error)

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.use('/post', postRouter)

app.listen(3065, () => {
  console.log("Server is running")
})