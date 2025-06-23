import { Request, Response } from 'express'
import { Course } from '../model/course.model'
import { uploadToCloudinary } from '../../utilits/cloudinary'
import { ICourse } from '../interface/course.interface'

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

    res.status(201).json({
      success: true,
      message: '✅ Course created successfully',
      data: result,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: '❌ Failed to create course' })
  }
}

const getAllCourse = async (_req: Request, res: Response) => {
  try {
    const result = await Course.find()
    res.status(200).json({
      success: true,
      message: '✅ All courses retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: '❌ Failed to retrieve courses' })
  }
}

const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await Course.findById(id)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: '❌ Course not found',
      })
    }

    res.status(200).json({
      success: true,
      message: '✅ Course retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: '❌ Failed to retrieve course' })
  }
}

const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const updateData: Partial<ICourse> = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    }

    if (req.file) {
      const imageUrl = (await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
      )) as string

      updateData.thumbnail = imageUrl
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: '❌ Course not found',
      })
    }

    res.status(200).json({
      success: true,
      message: '✅ Course updated successfully',
      data: updatedCourse,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: '❌ Failed to update course' })
  }
}

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deleted = await Course.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: '❌ Course not found',
      })
    }

    res.status(200).json({
      success: true,
      message: '✅ Course deleted successfully',
      data: deleted,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: '❌ Failed to delete course' })
  }
}

export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
}
