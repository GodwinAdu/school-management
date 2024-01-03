import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },

    level: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
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


const Class = mongoose.models.Class || mongoose.model("Class", ClassSchema);

export default Class;