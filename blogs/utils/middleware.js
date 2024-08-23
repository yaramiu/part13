const errorHandler = (error, request, response, next) => {
  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message.split(".")[1] });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: "invalid type" });
  }

  next();
};

export { errorHandler };
