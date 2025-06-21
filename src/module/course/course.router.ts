import { Router } from 'express'
import { createUser } from './course.controller'
import { verifyCourse } from './course.validation'

const router = Router()

router.post('/register', verifyCourse, createUser)

export default router
