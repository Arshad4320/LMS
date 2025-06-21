import { model, Schema } from 'mongoose'
import { IModule } from '../interface/module.interface'

const moduleSchema = new Schema<IModule>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    moduleNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
export const Module = model<IModule>('Module', moduleSchema)
