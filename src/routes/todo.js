const Router = require('express')
const Todo = require('../models/todo')
const router = new Router()

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find({})
    res.json(todos)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const post = await Todo.create(body)
    res.json(post)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.put('/:todoId', async (req, res, next) => {
  try {
    const body = req.body
    const post = await Todo.findById(req.params.todoId)
    if(body.title !== undefined) {
      post.title = body.title
    }
    if(body.isDone !== undefined) {
      post.isDone = body.isDone
    }
    await post.save()
    res.json(post)
  } catch(e) {
    console.log(e)
    next(e)
  }
})

router.delete('/:todoId', async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId)
    res.json({ message: 'Todo has been deleted successfuly' })
  } catch(e) {
    console.log(e)
    next(e)
  }
})


module.exports = router