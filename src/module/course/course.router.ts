import { Router } from 'express'
import { courseController } from './course.controller'

const router = Router()

router.post('/create-course', courseController.createCourse)
router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getSingleCourse)
router.patch('/update-course/:id', courseController.updateCourse)
router.delete('/delete-course/:id', courseController.deleteCourse)

export default router
