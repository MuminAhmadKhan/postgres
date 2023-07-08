const express = require('express')
const app = express()
const {checkConnection} = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readinglistRouter = require('./controllers/readinglists')

const errorHandler = require('./utils/middleware/errorHandler')
// console.log(blogsRouter.get)
const {PORT} = require('./utils/config')

app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use('/api/authors',authorRouter)
app.use('/api/readinglists',readinglistRouter)

app.use(errorHandler)
const start = async ()=>{
  await checkConnection()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()