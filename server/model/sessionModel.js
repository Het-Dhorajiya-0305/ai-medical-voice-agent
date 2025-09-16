import mongoose from "mongoose";


const reportSchema = new mongoose.Schema({
  diagnosis: {
    type: String,
    required: true
  },
  prescribedMedicines: {
    type: [String], 
    default: []
  },
  followUp: {
    type: String
  },
  doctorNotes: {
    type: String
  }
}, { _id: false });

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
    report:reportSchema,
    
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;