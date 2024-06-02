export const messageResponse = ({
  res,
  status = 200,
  message = "Success",
  data = null,
  success = false,
}) => {
  res.status(status).json({
    message,
    data,
    success,
  });
};
