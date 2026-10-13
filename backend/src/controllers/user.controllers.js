
import User from "../model/user.model.js";


export const getMe = async (req, res) => {
  try {
    // User ID comes from the verified JWT
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const logOut = async (req, res) => {
  try {
    const userId = req.userId;
    if(!userId){
      return res.status(400).json({
        success: false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // User ID comes from the verified JWT middleware
    const userId = req.userId;

    const deletedUser = await User.findByIdAndUpdate(userId,{isActive:false}, { new: true, runValidators: true });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

