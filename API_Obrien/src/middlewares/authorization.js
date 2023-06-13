const authorization = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      throw new Error("You don't have permission to perform this action!");
    }

    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export default authorization;
