import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const verifyUser = async (req, res, next) => {
    try {

        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "unathorized user"
            })
        }
        const decodeToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);


        const user = await User.findById(decodeToken._id).select("-password -refreshToken");


        if (!user) {
            res.status(404).json(
                {
                    success: false,
                    message: "invalid access token"
                }
            )
        }

        req.userId = user._id;

        next();
    } catch (error) {
        console.error("Error in verifyUser middleware:", error.name, error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid access token",
            error: error.message
        });
    }
}
export default verifyUser;