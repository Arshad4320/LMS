import { Router } from 'express'
import userRouter from '../module/course/course.index'

const router = Router()

router.use('/user', userRouter)

export default router
