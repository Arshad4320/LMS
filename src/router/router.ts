import { Router } from 'express'

import courseRouter from './../module/course/router/course.router'

const router = Router()

router.use('/course', courseRouter)

export default router
