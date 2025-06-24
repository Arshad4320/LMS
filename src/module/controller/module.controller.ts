import { Request, Response } from 'express'
import { Module } from '../model/module.model'

const getNextModuleNumber = async (courseId: string) => {
  const modules = await Module.find({ courseId })
    .sort({ moduleNumber: -1 })
    .limit(1)
  return modules.length ? modules[0].moduleNumber + 1 : 1
}
const createModule = async (req: Request, res: Response) => {
  try {
    const { courseId, title } = req.body
    const moduleNumber = await getNextModuleNumber(courseId)
    const result = await Module.create({ courseId, title, moduleNumber })

    res.json({
      success: true,
      message: 'module create successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getAllModuleByCourse = async (req: Request, res: Response) => {
  try {
    const result = await Module.find({ courseId: req.params.courseId })
    res.json({
      success: true,
      message: 'get all module',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getSingleModule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = await Module.findById(id)

    res.json({
      success: true,
      message: 'module retrieve successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getAllModule = async (req: Request, res: Response) => {
  try {
    const result = await Module.find()
    res.json({
      success: true,
      message: 'get all module',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const updateModule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const data = req.body
    const result = await Module.findByIdAndUpdate(id, data, { new: true })
    res.json({
      success: true,
      message: 'module update successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const deleteModule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await Module.findByIdAndDelete(id, { new: true })
    res.json({
      success: true,
      message: 'module deleted successfully',
      result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const moduleController = {
  createModule,
  getAllModuleByCourse,
  getAllModule,
  updateModule,
  deleteModule,
  getSingleModule,
}
