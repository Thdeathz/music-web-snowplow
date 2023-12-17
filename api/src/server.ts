import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import admin from 'firebase-admin'

import app from '~/servers/init.express'

import corsOptions from '~/config/corsOptions'
import serviceAccount from '~/config/firebase'

import errorHandler from '~/api/middleware/errorHandler'
import rootRoute from '~/api/routes/root.route'
import notFoundRoute from '~/api/routes/404.route'
import authRoutes from '~/api/routes/auth.route'
import userRoutes from '~/api/routes/user.route'
import musicRoutes from '~/api/routes/music.route'
import topicRoutes from '~/api/routes/topic.route'

dotenv.config()

console.log(process.env.NODE_ENV)

/* MIDDLEWARE */
app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

/* CONFIG */
app.use('/api', express.static(path.join(__dirname, '../public')))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
})

/* ROUTES */
// public routes
app.use('/api', rootRoute)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/music', musicRoutes)

// private routes
app.use('/api/topic', topicRoutes)
app.use('*', notFoundRoute)

app.use(errorHandler)
