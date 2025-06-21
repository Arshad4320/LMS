import { Router } from 'express'
import courseRouter from '../module/course/course.index'

const router = Router()

router.use('/course', courseRouter)

export default router
