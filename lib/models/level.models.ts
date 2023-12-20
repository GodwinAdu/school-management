import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
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


const Level = mongoose.models.Level || mongoose.model("Level", LevelSchema);

export default Level;