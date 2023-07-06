const errorHandler = (error, request, response, next) => {
  
    return response.json(error?.errors)
  }

module.exports = errorHandler