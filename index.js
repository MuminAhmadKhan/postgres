const express = require('express')
const app = express()
const {checkConnection} = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./utils/errorHandler')
// console.log(blogsRouter.get)
const {PORT} = require('./utils/config')

app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use(errorHandler)
const start = async ()=>{
  await checkConnection()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()