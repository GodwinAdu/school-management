import mongoose, { Document } from "mongoose";
export interface IDay extends Document{
    _id:string;
    name:string;
    createdBy:string;
    createAt:Date;
    updateAt?:Date;
}

const DaySchema = new mongoose.Schema({
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


const Day = mongoose.models.Day || mongoose.model("Day", DaySchema);

export default Day;