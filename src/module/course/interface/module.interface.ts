import { Types } from 'mongoose'

export type IModule = {
  courseId: Types.ObjectId
  title: string
  moduleNumber: number
}
