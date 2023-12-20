import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    period:{
        type:String,
        required:true
    },
    present:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;