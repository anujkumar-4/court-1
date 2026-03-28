export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({ message: "Case number must be unique" });
  }

  return res.status(500).json({ message: err.message || "Server error" });
};
