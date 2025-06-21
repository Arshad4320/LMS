import { Router } from 'express'
import userRouter from '../module/user/user.index'
import uploadRouter from '../module/fileUpload'

const router = Router()

router.use('/user', userRouter)

export default router
