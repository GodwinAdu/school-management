import mongoose, { Document } from "mongoose";

export interface ILevel extends Document {
    _id:string;
    name: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

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