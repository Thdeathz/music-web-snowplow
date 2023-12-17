import express from 'express'
import { getAllTopics } from '../controllers/topic.controller'

const router = express.Router()

router.route('/').get(getAllTopics)

export default router
