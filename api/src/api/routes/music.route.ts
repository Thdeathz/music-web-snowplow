import express from 'express'

import { getAllMusic, getMusicById } from '../controllers/music.controller'

const router = express.Router()

router.route('/').get(getAllMusic)
router.route('/:id').get(getMusicById)

export default router
