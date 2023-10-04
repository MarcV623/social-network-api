const { Types } = require('mongoose')

const connection = require('../config/connection')

const { User, Thought } = require('../models')

connection.on('error', (err) => err)

connection.once('open', async () => {
  // Create ids as necessary
  const mid = new Types.ObjectId()
  const fid = new Types.ObjectId()
  const jid = new Types.ObjectId()

  const mthoughtid = new Types.ObjectId()
  const fthoughtid = new Types.ObjectId()

  const fmreactionid = new Types.ObjectId()
  const jmreactionid = new Types.ObjectId()

  const jfreactionid = new Types.ObjectId()

  // Check thoughts collection
  const thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray()

  if (thoughtCheck.length > 0) {
    await connection.dropCollection('thoughts')
  }

  await Thought.collection.insertMany([
    {
      _id: mthoughtid,
      thoughtText: 'Hello World!',
      username: 'mvargas01',
      reactions: [
        {
          reactionId: fmreactionid,
          username: 'mydadisdead091',
          reactionBody: 'Hi!'
        },
        {
          reactionId: jmreactionid,
          username: 'imnotdeaddummy57',
          reactionBody: 'Howdy!'
        }
      ]
    },
    {
      _id: fthoughtid,
      thoughtText: 'I hate Slippy!',
      username: 'mydadisdead091',
      reactions: [
        {
          reactionId: jfreactionid,
          username: 'imnotdeaddummy57',
          reactionBody: 'Don\'t be mean to Slippy.'
        }
      ]
    }
  ])

  // Check users collection
  const userCheck = await connection.db.listCollections({ name: 'users' }).toArray()

  if (userCheck.length > 0) {
    await connection.dropCollection('users')
  }

  await User.collection.insertMany([
    {
      _id: mid,
      username: 'mvargas01',
      email: 'mav@gmail.com',
      thoughts: [
        mthoughtid
      ],
      friends: [
        fid, jid
      ]
    },
    {
      _id: fid,
      username: 'mydadisdead091',
      email: 'foxmcloud@arwing.net',
      thoughts: [
        fthoughtid
      ],
      friends: [
        jid
      ]
    },
    {
      _id: jid,
      username: 'imnotdeaddummy57',
      email: 'jamesmcloud@arwing.net',
      thoughts: [],
      friends: [
        fid
      ]
    }
  ])

  console.info('Seeding complete!')
  process.exit(0)
})
