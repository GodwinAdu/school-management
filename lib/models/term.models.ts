import mongoose, { Document } from "mongoose";


export interface ITerm extends Document {
    _id:string;
    name: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}
const TermSchema = new mongoose.Schema({
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


const Term = mongoose.models.Term || mongoose.model("Term", TermSchema);

export default Term;