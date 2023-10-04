const connection = require('../config/connection')

const { User } = require('../models')

connection.on('error', (err) => err)

connection.once('open', async () => {
  const userCheck = await connection.db.listCollections({ name: 'users' }).toArray()

  if (userCheck.length) {
    await connection.dropCollection('users')
  }

  await User.collection.insertMany([
    {
      username: 'mvargas01',
      email: 'mav@gmail.com',
      friends: []
    }
  ])

  console.info('Seeding complete!')
  process.exit(0)
})
