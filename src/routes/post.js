const Router = require('express')
const Post = require('../models/post')
const router = new Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await Post.find({})
    res.json(users)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const post = await Post.create(body)
    res.json(post)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.put('/:postId', async (req, res, next) => {
  try {
    const body = req.body
    const post = await Post.findById(req.params.postId)
    console.log({ post, body }, req.postId)
    post.title = body.title
    post.description = body.description
    await post.save()
    res.json(post)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.delete('/:postId', async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId)
    res.json({ message: 'Post has been deleted successfuly' })
  } catch(e) {
    console.log(e)
    next(e)
  }
})


module.exports = router