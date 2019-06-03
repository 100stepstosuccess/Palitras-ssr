const createError = (code, message, shouldRedirect) => {
  const error = new Error(message);
  error.statusCode = code;
  if (shouldRedirect) error.shouldRedirect = true;
  return error;
};

module.exports = createError;
