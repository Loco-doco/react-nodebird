import express from 'express';
// const express = require('express');
import { Post, Comment } from '../models';
import { isLoggedIn, isNotLoggedIn } from './middlewares';

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello this is the post page")
})

// 게시글 등록
router.post('/', isLoggedIn, async (req,res, next) => {
  console.log('Post 요청이 들어옴')
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    })
    res.status(201).json(post);
  }catch(e){
    console.error(e);
    next(e)
  }
})

// 게시글 코멘트 등록
router.post('/:postId/comment', isLoggedIn, async (req,res, next) => {
  try{
    const post = Comment.findOne({
      where: { id: req.params.postId }
    })
    if(!post){
      return res.status(403).send('존재하지 않느 ㄴㄱ세시글')
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id
    })
    res.status(201).json(comment);
  }catch(e){
    console.error(e);
    next(e)
  }
})

router.delete('/', (req, res) => {
  res.json({ id: 1});
})

export default router;
// module.exports = router