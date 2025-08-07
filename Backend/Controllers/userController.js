const userSchema = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ***** User Register Code
exports.register = async (req, res) => {
    try {
        // Get a request from frontend
        const { fullname, email, phoneNumber, password, role } = req.body;
        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        }

        // This Code checking user email is already exist or not exist
        const users = await userSchema.findOne({ email });

        if (users) {
            return res.status(400).json({
                message: "User Already exist with this email !",
                success: false
            })
        }

        // Hashing user password
        const hashPassword = await bcrypt.hash(password, 10);

        // User Creation
        const User = await userSchema.create({
            fullname, email, phoneNumber, password: hashPassword, role
        })

        return res.status(201).json({
            message: "Account created Successfully !",
            success: true
        })

    } catch (error) {
        console.log(error, "error");
    }
}

// ***** User Login Code
exports.login = async (req, res) => {
    try {
        // Get a request from frontend
        const { email, password, role } = req.body;
        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // Check if user exists with the given email
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        };

        // check role is correct or not 
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        }

        // payload
        const payload = {
            userId: user._id
        }

        const loggedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // genrate a token
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        // store a token in a cookies
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welocme back ${loggedUser.fullname}`,
            loggedUser,
            success: true
        });

    } catch (error) {
        console.log(error, "error");
    }
};

// ***** User Logout Code
exports.logout = async (req, res) => {
    try {
        // Clear the token cookie and logout the user

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfully !",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// ***** User Update Code
exports.updateProfile = async (req, res) => {
    try {
        // Get a request from frontend
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // // Validate required fields
        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "Something is missing !",
        //         success: false
        //     });
        // }

        // Convert skills string into an array
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        // Get user ID from the authenticated request 
        const userId = req.id;

        // Find the user in a database
        let updatedUser = await userSchema.findById(userId);
        if (!updatedUser) {
            return res.status(400).json({
                message: "User not found !",
                success: false
            })
        }

        // Update user profile fields
        if (fullname) updatedUser.fullname = fullname
        if (email) updatedUser.email = email
        if (phoneNumber) updatedUser.phoneNumber = phoneNumber
        if (bio) updatedUser.profile.bio = bio
        if (skills) updatedUser.profile.skills = skillsArray

        await updatedUser.save();

        // response
        const userResponse = {
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            role: updatedUser.role,
            profile: updatedUser.profile
        };

        return res.status(200).json({
            message: "Profile Updated Successfully !",
            userResponse,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while updating profile.",
            success: false
        });
    }
}