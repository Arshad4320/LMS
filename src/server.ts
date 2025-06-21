import app from './app'
import config from './config/index'
import connectDB from './config/db.config'

const startServer = async () => {
  await connectDB()
  app.listen(config.port, () => {
    console.log('LMC Server is Running On Port', config.port)
  })
}

startServer()
