const errorHandler = (error, request, response, next) => {
    
    return response.status(400).json(error.errors)
  }

module.exports = errorHandler