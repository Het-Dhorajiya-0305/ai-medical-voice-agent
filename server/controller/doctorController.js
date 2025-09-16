import Doctors from "../model/doctorModel.js";

const addDoctor = async (req, res) => {

    try {
        const { name, imageUrl, specialization, description, agentPrompt } = req.body;
        if (!name || !imageUrl || !specialization || !description || !agentPrompt) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const newDoctor = await Doctors.create({
            name,
            imageUrl,
            specialization,
            description,
            agentPrompt
        });
        if (!newDoctor) {
            return res.status(500).json({
                message: "Error in creating doctor",
                success: false
            });
        }
        return res.status(201).json({
            message: "Doctor added successfully",
            success: true,
            doctor: newDoctor
        });
    }
    catch (error) {
        console.log("Error in addDoctor controller:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

const allDoctors = async (req, res) => {
    try {

        const doctors = await Doctors.find({});

        if (!doctors) {
            return res.status(404).json({
                message: "No doctors found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Doctors fetched successfully",
            success: true,
            doctors
        });
    } catch (error) {
        console.log("Error in allDoctors controller:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

const getDoctor=async (req,res) => {
    try {
        const {name,specialization}=req.body;

        if(!name && !specialization){
            return res.status(400).json({
                message:"Doctor name or specialization is required",
                success:false
            })
        }

        const doctor=await Doctors.findOne({
            $or:[
                {name:name},
                {specialization:specialization}
            ]
        });

        if(!doctor){
            return res.status(404).json({
                message:"Doctor not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Doctor fetched successfully",
            success:true,
            doctor
        })

    } catch (error) {
        console.log("Error in getDoctor controller:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export { addDoctor,allDoctors,getDoctor };