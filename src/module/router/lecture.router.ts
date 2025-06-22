import { Router } from 'express'

import { lectureController } from '../controller/lecture.controller'
import { upload } from '../../utilits/uploader'

const router = Router()

router.post(
  '/create-lecture',
  upload.array('pdfNotes', 5),
  lectureController.createLecture,
)
router.get('/:moduleId', lectureController.getLectures)

router.put(
  '/update-lecture/:id',
  upload.array('pdfNotes', 5),
  lectureController.updateLecture,
)
router.delete('/delete-lecture/:id', lectureController.deleteLecture)

export default router
