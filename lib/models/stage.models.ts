import mongoose, { Document } from "mongoose";

export interface IStage extends Document {
    _id:string;
    name: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

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