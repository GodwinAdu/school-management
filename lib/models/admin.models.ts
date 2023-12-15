import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: true
    },
    email: { type: String },
    dob: { type: String },
    role: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
    },
    currentAddress: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Adminuser = mongoose.models.Adminuser || mongoose.model("Adminuser", AdminSchema);

export default Adminuser;