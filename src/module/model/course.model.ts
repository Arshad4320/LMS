import { Schema, model } from 'mongoose'
import { ICourse } from '../interface/course.interface'

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Course = model<ICourse>('Course', courseSchema)
