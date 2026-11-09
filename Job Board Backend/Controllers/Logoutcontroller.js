const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout Failed",
    });
  }
};

module.exports = { logout };
