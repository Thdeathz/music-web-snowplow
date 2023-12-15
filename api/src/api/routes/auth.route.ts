import express from 'express'

import limitRequest from '../middleware/limitRequest'
import { loginSchema, loginWithGoogleSchema } from '../validations/auth.validation'
import { login, loginWithGoogle, logout, refresh } from '~/api/controllers/auth.controller'
import validateRequest from '../middleware/validateRequest'

const router = express.Router()

router.route('/').post(limitRequest(20), validateRequest(loginSchema), login)

router
  .route('/google')
  .post(limitRequest(20), validateRequest(loginWithGoogleSchema), loginWithGoogle)

router.route('/refresh').get(refresh)

router.route('/logout').post(logout)

export default router
