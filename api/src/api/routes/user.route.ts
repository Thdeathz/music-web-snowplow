import express from 'express'

import validateRequest from '../middleware/validateRequest'
import {
  createNewUser,
  getAllUsers,
  updateAvatar,
  uploadFile
} from '~/api/controllers/user.controller'
import upload from '~/config/init.multer'
import { registerSchema } from '../validations/user.validation'

const router = express.Router()

router
  .route('/')
  .get(getAllUsers)
  .post(upload.single('avatar'), validateRequest(registerSchema), createNewUser)

router.route('/:id/avatar').post(upload.single('avatar'), updateAvatar)

router.route('/upload').get(upload.single('file'), uploadFile)

export default router
