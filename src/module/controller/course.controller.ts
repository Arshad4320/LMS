import { Request, Response } from 'express'
import { Course } from '../model/course.model'
import { uploadToCloudinary } from '../../utilits/cloudinary'

const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body
    const file = req.file

    let imageUrl = ''
    if (file) {
      imageUrl = (await uploadToCloudinary(
        file.buffer,
        file.originalname,
      )) as string
    }

    const result = await Course.create({
      title,
      description,
      price,
      thumbnail: imageUrl,
    })

    res.json({
      success: true,
      message: 'course created successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
const getAllCourse = async (req: Request, res: Response) => {
  try {
    const result = await Course.find()
    res.json({
      success: true,
      message: 'all course retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await Course.findById(id)
    res.json({
      success: true,
      message: 'single course retrieved successfully',
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
    const result = await Course.findByIdAndUpdate(id, data, { new: true })
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
    const result = await Course.findByIdAndDelete(id)
    res.json({
      success: true,
      message: 'course delete successfully',
      result,
    })
  } catch (err) {
    console.log(err)
  }
}
export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
}
