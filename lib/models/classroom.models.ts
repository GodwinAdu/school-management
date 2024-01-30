import mongoose,{Document} from "mongoose";

export interface IClassroom extends Document{
    _id:string;
    name:string;
    status:boolean;
    createAt:Date;
    updateAt?:Date
}
const ClassroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Classroom = mongoose.models.Classroom || mongoose.model("Classroom", ClassroomSchema);

export default Classroom;