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

router.put('/:id', async (req, res, next) => {
  try {
    const body = res.body
    const post = await Post.findById(req.params.id)
    post.title = body.title
    post.description = body.description
    res.json(post)
  } catch(e) {
    console.log(e)
    next(e)
  }
})


module.exports = router