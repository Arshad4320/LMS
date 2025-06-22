import { Router } from 'express'
import { courseControllers } from '../controller/course.controller'
import { upload } from '../../middleware/uploade'

const router = Router()

router.post(
  '/create-course',
  upload.single('thumbnail'),
  courseControllers.createCourse,
)
router.get('/', courseControllers.getAllCourse)
router.get('/:id', courseControllers.getSingleCourse)
router.patch('/update-course/:id', courseControllers.updateCourse)
router.delete('/delete-course/:id', courseControllers.deleteCourse)

export default router
