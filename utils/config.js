require('dotenv').config()

DATABASE_URL = process.env.DATABASE_URL
PORT = process.env.PORT || 3001
SECRET = "secret"
module.exports = {DATABASE_URL, PORT, SECRET}