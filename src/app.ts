import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import router from './router/router'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'LMS Server Is Running',
  })
})

app.use('https://lms-1nc6.onrender.com/', router)

export default app
