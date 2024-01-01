import mongoose from "mongoose";

const HouseSchema = new mongoose.Schema({
    name: {
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


const House = mongoose.models.House || mongoose.model("House",HouseSchema);

export default House;