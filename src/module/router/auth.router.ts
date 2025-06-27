import express from 'express'

import { verifyToken } from '../../middleware/verifyToken'
import { authController } from '../controller/auth.controller'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/videos', verifyToken, authController.getCourseVideos)
router.get('/admin/dashboard', verifyToken, authController.getAdminDashboard)
router.post('/logout', authController.logout)

export default router
