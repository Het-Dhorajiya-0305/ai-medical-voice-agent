import mongoose from 'mongoose';


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    agentPrompt:{
        type:String,
        required:true
    },
    voiceId:{
        type:String,
        required:true
    }
},{timestamps:true});

const Doctors=mongoose.model('doctors',doctorSchema);

export default Doctors;