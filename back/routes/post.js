import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello this is the post page")
})

router.post('/', (req,res) => {
  res.json({ id: 1, content: 'hello'});
})

router.delete('/', (req, res) => {
  res.json({ id: 1});
})

export default router;