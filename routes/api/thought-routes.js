const router = require('express').Router()
const { User, Thought } = require('../../models')

// GET /api/thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find()
  res.status(200).json(thoughts)
})

// GET /api/thoughts/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id

  const thought = await Thought.findById(id)

  if (!thought) {
    return res.status(404).json({ message: 'Thought not found' })
  }

  res.status(200).json(thought)
})

// POST /api/thoughts
router.post('/', async (req, res) => {
  const user = await User.findById(req.body.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (req.body.username !== user.username) {
    return res.status(400).json({ message: 'Username does not match' })
  }

  const thought = await Thought.create(req.body)

  await User.findByIdAndUpdate(req.body.userId, {
    $addToSet: {
      thoughts: thought._id
    }
  })

  res.status(200).json(thought)
})

// DELETE /api/thoughts/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const thought = await Thought.findByIdAndRemove(id)

  if (!thought) {
    return res.status(404).json({ message: 'Thought not found' })
  }

  res.status(200).json(thought)
})

module.exports = router
