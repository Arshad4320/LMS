import { Router } from 'express'

import { lectureController } from '../controller/lecture.controller'
import { upload } from '../../utilits/uploader'

const router = Router()

// router.post('/create-lecture', lectureController.createLecture)
router.post(
  '/create-lecture',
  upload.array('pdfNotes', 5),
  lectureController.createLecture,
)
router.get('/', lectureController.getLectures)

// router.patch('/update-lecture/:id', lectureController.updateLecture)
router.put(
  '/update-lecture/:id',
  upload.array('pdfNotes', 5),
  lectureController.updateLecture,
)
router.delete('/delete-lecture/:id', lectureController.deleteLecture)

export default router
