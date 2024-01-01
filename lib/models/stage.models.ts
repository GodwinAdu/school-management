import mongoose from "mongoose";

const StageSchema = new mongoose.Schema({
    name: {
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


const Stage = mongoose.models.Stage || mongoose.model("Stage", StageSchema);

export default Stage;