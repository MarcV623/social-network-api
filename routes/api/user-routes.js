const router = require('express').Router()
const { User, Thought } = require('../../models')

// GET /api/users
router.get('/', async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
})

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findByIdAndRemove(id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
})

module.exports = router
