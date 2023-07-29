exports.successResponse = (res, message) => {
  return res.status(200).json({
    status: 1,
    message: message,
  });
};

exports.successResponseWithData = (res, message, data) => {
  return res.status(200).json({
    status: 1,
    message: message,
    data: data,
  });
};

exports.failedResponse = (res, message) => {
  return res.status(400).json({
    status: 0,
    message: message,
  });
};

exports.errorResponse = (res, error) => {
  console.log(error);
  return res.status(500).json({
    status: 0,
    error: error,
  });
};

exports.notFoundResponse = (res, message) => {
  return res.status(404).json({
    status: 0,
    message: message,
  });
};

exports.unauthorizedResponse = (res, message, error) => {
  console.log(error);
  return res.status(401).json({
    status: 0,
    message: message,
    error: error || "NOT FOUND",
  });
};

exports.validationErrorResponse = (res, message, data) => {
  return res.status(400).json({
    status: 0,
    message: message,
    data: data,
  });
};
