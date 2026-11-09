const model = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailexist = await model.findOne({ email });

    if (!emailexist) {
      return res.status(400).json({
        message: "Email is incorrect",
      });
    }

    const passwordmatch = await bcryptjs.compare(password, emailexist.password);
    if (!passwordmatch) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const tokendata = {
      userId: emailexist._id,
    };
    const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: emailexist._id,
      name: emailexist.name,
      email: emailexist.email,
      password: emailexist.password,
      role: emailexist.role,
      isverified: emailexist.isverified,
      company: emailexist.company,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        role: emailexist.role,
        user,
      });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};

module.exports = { login };
