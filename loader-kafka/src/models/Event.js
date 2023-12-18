import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  // Define your schema fields here
  eventName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    default: null
  },
  userName: {
    type: String,
    default: null
  },
  songId: {
    type: String,
    default: null
  },
  songTitle: {
    type: String,
    default: null
  },
  artistName: {
    type: String,
    default: null
  },
  topicList: {
    type: Array,
    default: null
  },
  time: {
    type: Date,
    default: Date.now
  },
  topicId: {
    type: String,
    default: null
  },
  topicName: {
    type: String,
    default: null
  }
})

const Event = mongoose.model('Event', eventSchema)

export default Event
