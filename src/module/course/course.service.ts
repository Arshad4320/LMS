import { ICourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDb = async (payload: ICourse) => {
  const result = await Course.create(payload)
  return result
}
const getAllCourseFromIntoDb = async () => {
  const result = await Course.find()
  return result
}
const getSingleCourseFromIntoDb = async (id: string) => {
  const result = await Course.findOne({ _id: id })
  return result
}
const updateCourseFromIntoDb = async (id: string, payload: ICourse) => {
  const result = await Course.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deleteCourseFromIntoDb = async (id: string) => {
  const result = await Course.findByIdAndDelete({ _id: id }, { new: true })
  return result
}
export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromIntoDb,
  getSingleCourseFromIntoDb,
  updateCourseFromIntoDb,
  deleteCourseFromIntoDb,
}
