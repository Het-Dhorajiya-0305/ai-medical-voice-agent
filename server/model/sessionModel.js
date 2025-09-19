import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    note: {
        type: Object,
        default: {}
    },
    conversation: {
        type: Object,
        default: {}
    },
    report:{
        type: Object,
        default: {}
    },
    
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;