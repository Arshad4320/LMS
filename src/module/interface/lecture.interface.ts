import { Types } from 'mongoose'

export type ILecture = {
  moduleId: Types.ObjectId
  title: string
  videoUrl: string
  pdfNotes: string
}
