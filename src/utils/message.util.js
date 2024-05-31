export const messageResponse = ({
  res,
  status = 200,
  message = "Success",
  data = null,
}) => {
  res.status(status).json({
    message,
    data,
  });
};
