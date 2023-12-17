import type { RequestHandler } from 'express'
import topicService from '../services/topic.service'

/**
 * @desc Get all topics
 * @route GET /api/topic
 * @access Public
 */
export const getAllTopics: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 10

  const { topics, total } = await topicService.getAllTopics(page, offset)

  return res.status(200).json({
    message: 'Get all topics successfully',
    data: topics,
    meta: {
      total: total / offset,
      currentPage: page,
      offset
    }
  })
}
