import mongoose, { Document } from "mongoose";

export interface IHouse extends Document {
    _id: string;
    name: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}

const HouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: String,
        default: "School"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const House = mongoose.models.House || mongoose.model("House", HouseSchema);

export default House;