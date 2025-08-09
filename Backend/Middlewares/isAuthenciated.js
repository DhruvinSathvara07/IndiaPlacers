const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenciated = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token && typeof req.headers.authorization === "string") {
            if (req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated!",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token!",
                success: false
            });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
};

module.exports = isAuthenciated;