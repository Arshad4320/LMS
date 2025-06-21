import { model, Schema } from 'mongoose'
import { ILecture } from '../interface/lecture.interface'

const lectureSchema = new Schema<ILecture>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    pdfNotes: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Lecture = model<ILecture>('Lecture', lectureSchema)
