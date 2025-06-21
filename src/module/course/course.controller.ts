import { Request, Response } from 'express'
import { courseServices } from './course.service'
const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const result = await courseServices.createCourseIntoDb(data)
    res.json({
      success: true,
      message: 'Course create successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getAllCourse = async (req: Request, res: Response) => {
  try {
    const result = await courseServices.getAllCourseFromIntoDb()
    res.json({
      success: true,
      message: 'all course data retrieved',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await courseServices.getSingleCourseFromIntoDb(id)
    res.json({
      success: true,
      message: 'single course data retrieved',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = courseServices.updateCourseFromIntoDb(id, data)
    res.json({
      success: true,
      message: 'course update successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = courseServices.deleteCourseFromIntoDb(id)
    res.json({
      success: true,
      message: 'course delete successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
}
