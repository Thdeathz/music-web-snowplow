import express from 'express'

import { getAllMusic, getMusicByArtist, getMusicById } from '../controllers/music.controller'

const router = express.Router()

router.route('/').get(getAllMusic)
router.route('/:id').get(getMusicById)
router.route('/artist/:id').get(getMusicByArtist)

export default router
