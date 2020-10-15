import express from "express";

// const postRouter = require('./routes/post');

import postRouter from './routes/post'

const app = express();

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.use('/post', postRouter)

app.listen(3065, () => {
  console.log("Server is running")
})