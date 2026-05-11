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


module.exports = { registerUser, loginUser, getCurrentUser };