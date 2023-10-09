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

// POST /api/users
router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.status(200).json(user)
})

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findByIdAndUpdate(id, req.body)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ message: 'User successfully updated!' })
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

// POST /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const friend = await User.findById(req.params.friendId)

  if (!friend) {
    return res.status(404).json({ message: 'Friend not found' })
  }

  if (req.params.userId === req.params.friendId) {
    return res.status(400).json({ message: 'User & friend ids cannot be the same' })
  }

  await User.findByIdAndUpdate(req.params.userId, {
    $addToSet: {
      friends: req.params.friendId
    }
  })

  res.status(200).json({ message: 'User successfully updated' })
})

module.exports = router
