import User from "../models/User.js";



export const getUser = async (req, res) => {
  try {
    const userId = req.body.userId; // get ID from URL

    const user = await User.findById(userId)
      .populate("organization", "name")
      .populate("branch", "name")
      .populate("roles", "name")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const getAllUsers = async (req, res) => {
  try {
    // Get the logged-in user ID from auth middleware
    const currentUserId = req.user?.userId;

    // Query all users except the current logged-in user
    const query = currentUserId ? { _id: { $ne: currentUserId } } : {};
    const users = await User.find(query)
      .populate("organization", "name")
      //.populate("branch", "name")
      .populate("roles", "name")
      .select("-password"); // never return passwords

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
