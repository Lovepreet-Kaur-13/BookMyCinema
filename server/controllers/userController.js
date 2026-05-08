const User = require("../models/userModel");


// REGISTER USER

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "User Already Exists"
            });
        }

        
        // add new user
        const newUser = new User({
            name,
            email,
            password
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


module.exports = { registerUser };