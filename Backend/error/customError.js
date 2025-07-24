class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFound extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.statusCode = 401; // 401
  }
}


module.exports = {
  UnauthenticatedError,
  CustomError,
  BadRequest,
  NotFound,
};
