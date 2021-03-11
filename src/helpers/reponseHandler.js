export const respondWithSuccess = (
  res,
  statusCode = 200,
  message,
  additionalFields
) => {
  res.status(statusCode).send({
    success: true,
    message,
    payload: additionalFields,
  });
};

export const respondWithWarning = (
  res,
  statusCode = 500,
  message,
  additionalFields
) => {
  res.status(statusCode).send({
    success: false,
    message,
    payload: additionalFields,
  });
};
