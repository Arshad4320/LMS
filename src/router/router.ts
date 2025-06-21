import { Router } from 'express'

import courseRouter from '../module/router/course.router'
import moduleRouter from '../module/router/module.router'
import lectureRouter from '../module/router/lecture.router'
import authRouter from '../module/router/auth.router'

const router = Router()

router.use('/course', courseRouter)
router.use('/module', moduleRouter)
router.use('/lecture', lectureRouter)
router.use('/auth', authRouter)
export default router
