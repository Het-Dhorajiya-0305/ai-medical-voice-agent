import Session from "../model/sessionModel.js";
import User from "../model/userModel.js";

const createSession = async (req, res) => {
    try {
        const { doctorId, note } = req.body;
        const userId = req.userId;

        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "DoctorId is required"
            })
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            })
        }

        const newSession = await Session.create({
            doctorId,
            userId,
            note
        })

        if (!newSession) {
            return res.status(500).json({
                success: false,
                message: "Error in creating session"
            })
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.session.push(newSession._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "session created",
            newSession
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const generateReport = async (req, res) => {
    try {
        const {messages,sessionId}=req.body;

        if(!sessionId){
            return res.status(400).json({
                success:false,
                message:"sessionId is required"
            })
        }
        
        if(!messages || messages.length===0){
            return res.status(400).json({
                success:false,
                message:"messages are required"
            })
        }

        const session=await Session.findById(sessionId);

        if(!session){
            return res.status(404).json({
                success:false,
                message:"Session not found"
            })
        }

        const completion=await openai

    } catch (error) {
        
    }
}
export { createSession, generateReport };