const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenciated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not Authenciated !",
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token !",
                success: false
            })
        };

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = isAuthenciated;