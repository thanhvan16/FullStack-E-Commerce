const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel'); 

async function authTokenAdmin(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Vui lòng đăng nhập...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
            if (err || !decoded?._id) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            const user = await userModel.findById(decoded._id);
            if (!user || user.role !== 'ADMIN') {
                return res.status(403).json({
                    message: "Access denied. Admins only",
                    error: true,
                    success: false
                });
            }

            // Lưu userId cho các middleware sau dùng
            req.userId = user._id;
            next();
        });

    } catch (error) {
        res.status(500).json({
            message: err.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = authTokenAdmin;