import mongoose from "mongoose";

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