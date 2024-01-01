import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
        unique:true
    },
    createdBy:{
        type:String,
        default:"School"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Time = mongoose.models.Time || mongoose.model("Time", TimeSchema);

export default Time;