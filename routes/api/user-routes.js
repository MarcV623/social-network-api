const router = require('express').Router()
const { User, Thought } = require('../../models')

// GET /api/users
router.get('/', async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// GET /api/user/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id

  const results = await User.findAll({
    where: {
      id
    }
  })

  if (results.length === 0) {
    res.status(404).json({ error: 'Invalid Id Provided' })
  } else {
    const user = results[0]
    res.status(200).json(user)
  }
})

module.exports = router
