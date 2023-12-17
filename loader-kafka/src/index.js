import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import 'express-async-errors'
import cors from 'cors'
import mongoose from 'mongoose'

import connectDB from './databases/init.mogodb.js'

import corsOptions from './config/corsOptions.js'

import errorHandler from './middleware/errorHandler.js'
import { fetchDataFromAPI, producerSending } from './utils/producer.js'
import { createTopic } from './utils/create-topic.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)
connectDB()

/* MIDDLEWARE */
app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

app.use(errorHandler)

// producerSending().catch(console.error)
// mongodb connection testing
mongoose.connection.once('open', () => {
  console.log('Connected to database ><!')

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

mongoose.connection.on('error', err => {
  console.log(err)
})

createTopic()
// fetchDataFromAPI()
producerSending()
