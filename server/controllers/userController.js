const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// REGISTER USER

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "User Already Exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // add new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully, Please Login"
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

// LOGIN USER

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User doesn't exist, Please Register"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);


        if (!validPassword) {
            return res.status(400).send({
                success: false,
                message: "Invalid password"
            })

        }

        // token generation
        const token = jwt.sign({ userId: user._id },
            process.env.JWT_SECRETKEY,
            { expiresIn: "1d" },
        )


        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            data: token
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        res.status(200).send({
            success: true,
            message: "You are authorized",
            data: user
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email == undefined) {
      return res.status(401).json({
        success: false,
        message: "Please enter the email for forget Password",
      });
    }

    let user = await User.findOne({ email: email });

    if (user == null) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else if (user?.otp != undefined && Date.now() < user?.otpExpiry) {
      return res.json({
        success: false,
        message: "Please use otp sent on mail",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("otp generated : ", otp);
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    // integrate email server // smtp protocol

    res.send({
      success: true,
      message: "Otp has been sent",
    });
  } catch (err) {
    res.status(500), next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword, otp } = req.body;

    // CHECK PASSWORD MATCH
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // CHECK REQUIRED FIELDS
    if (!password || !confirmPassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (Date.now() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      return res.status(401).json({
        success: false,
        message: "OTP expired",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { registerUser, loginUser, getCurrentUser, forgotPassword, resetPassword };