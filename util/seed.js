const connection = require('../config/connection')

const { User, Thought } = require('../models')

connection.on('error', (err) => err)

connection.once('open', async () => {
  // Check users collection
  const userCheck = await connection.db.listCollections({ name: 'users' }).toArray()

  if (userCheck.length > 0) {
    await connection.dropCollection('users')
  }

  await User.collection.insertMany([
    {
      username: 'mvargas01',
      email: 'mav@gmail.com',
      thoughts: [],
      friends: []
    },
    {
      username: 'mydadisdead091',
      email: 'foxmcloud@arwing.net',
      thoughts: [],
      friends: []
    }
  ])

  // Check thoughts collection
  const thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray()

  if (thoughtCheck.length > 0) {
    await connection.dropCollection('thoughts')
  }

  await Thought.collection.insertMany([
    {
      thoughtText: 'Hello World!',
      username: 'mvargas01',
      reactions: []
    }
  ])

  console.info('Seeding complete!')
  process.exit(0)
})
