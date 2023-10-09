const router = require('express').Router()
const { Thought } = require('../../models')

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
