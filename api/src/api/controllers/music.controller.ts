import type { RequestHandler } from 'express'

import musicService from '../services/music.service'

/**
 * @desc Get all music
 * @route GET /api/music
 * @access Public
 */
export const getAllMusic: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 10
  const topic = req.query.topic as string | undefined

  const { musics, total } = await musicService.getMusics(page, offset, topic)

  return res.status(200).json({
    message: 'Get all musics successfully',
    data: musics,
    meta: {
      total: Math.ceil(total / offset),
      currentPage: page,
      offset
    }
  })
}

/**
 * @desc Get music by id
 * @route GET /api/music/:id
 * @access Public
 */
export const getMusicById: RequestHandler = async (req, res) => {
  const { id } = req.params

  const music = await musicService.getMusicById(id)

  return res.status(200).json({
    message: 'Get music by id successfully',
    data: music
  })
}

/**
 * @desc Get music by artist
 * @route GET /api/music/artist/:id
 * @access Public
 */
export const getMusicByArtist: RequestHandler = async (req, res) => {
  const { id } = req.params

  const music = await musicService.getMusicByArtist(id)

  return res.status(200).json({
    message: 'Get music by artist successfully',
    data: music
  })
}
