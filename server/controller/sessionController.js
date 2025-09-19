import Doctors from "../model/doctorModel.js";
import Session from "../model/sessionModel.js";
import User from "../model/userModel.js";
import OpenAI from "openai";


const REPORT_GENERATION_PROMPT = `
You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and conversation between user and AI medical agent, generate a structured report with the following fields:

1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
 "sessionId": "string",
 "agent": "string",
 "user": "string",
 "timestamp": "ISO Date string",
 "chiefComplaint": "string",
 "summary": "string",
 "symptoms": ["symptom1", "symptom2"],
 "duration": "string",
 "severity": "string",
 "medicationsMentioned": ["med1", "med2"],
 "recommendations": ["rec1", "rec2"],
}

Only include valid fields. Respond with nothing else.

 
`
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
        const { messages, sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "sessionId is required"
            })
        }

        if (!messages || messages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "messages are required"
            })
        }

        const session = await Session.findById(sessionId);
        const user = await User.findById(session.userId);
        const doctor = await Doctors.findById(session.doctorId);

        if (!session || !user || !doctor) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            })
        }

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPEN_AI_API_KEY
        });

        const UserInput = "AI Doctor Agent Info : " + JSON.stringify(doctor) + "session detail : " + JSON.stringify(session) + "user detail :" + JSON.stringify(user) + ", Conversation : " + JSON.stringify(messages);
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'system',
                    content: REPORT_GENERATION_PROMPT
                },
                {
                    role: 'user',
                    content: UserInput
                }
            ]
        })

        const reportText = completion.choices[0].message.content;

        const report = JSON.parse(reportText);

        if (!report) {
            return res.status(500).json({
                success: false,
                message: "Error in generating report"
            })
        }

        session.report = report;
        await session.save();

        return res.status(200).json({
            success: true,
            message: "Report generated",
            report
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteSession = async (req, res) => {
    try {
        const deleted = await Session.deleteMany({});
        return res.status(200).json({
            success: true,
            message: "All sessions deleted",
            deleted
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export { createSession, generateReport, deleteSession };