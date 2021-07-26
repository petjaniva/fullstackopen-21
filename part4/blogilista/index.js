const http = require('http')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
app.use('api/blogs', blogRouter)



const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})