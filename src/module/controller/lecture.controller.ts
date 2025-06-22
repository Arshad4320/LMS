import { Request, Response } from 'express'
import { Lecture } from '../model/lecture.model'

const createLecture = async (req: Request, res: Response) => {
  try {
    const { moduleId, title, videoUrl } = req.body
    const pdfNotes =
      (req.files as Express.Multer.File[] | undefined)?.map(
        file => file.path,
      ) || []

    const result = await Lecture.create({
      moduleId,
      title,
      videoUrl,
      pdfNotes,
    })
    res.json({
      success: true,
      message: 'create lecture',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getLectures = async (req: Request, res: Response) => {
  try {
    const { moduleId, courseId } = req.query

    const filter: any = {}
    if (moduleId) filter.moduleId = moduleId

    const lectures = await Lecture.find(filter).populate({
      path: 'moduleId',
      match: courseId ? { courseId } : {},
    })

    const result = lectures.filter(l => l.moduleId !== null)

    res.status(200).json({
      success: true,
      message: 'lecture successfully retrieved',
      data: result,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lectures',
      error: err,
    })
  }
}

const updateLecture = async (req: Request, res: Response) => {
  try {
    const { title, videoUrl } = req.body
    const pdfNotes = req.files
      ? (req.files as Express.Multer.File[]).map(file => file.path)
      : []

    const result = await Lecture.findByIdAndUpdate(
      req.params.id,
      { title, videoUrl, pdfNotes },
      { new: true },
    )
    res.json({
      success: true,
      message: 'lecture update successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({ message: 'Lecture update failed', error: err })
  }
}

const deleteLecture = async (req: Request, res: Response) => {
  try {
    const result = await Lecture.findByIdAndDelete(req.params.id)
    res.json({
      success: true,
      message: 'lecture deleted successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const lectureController = {
  createLecture,
  getLectures,
  updateLecture,
  deleteLecture,
}
