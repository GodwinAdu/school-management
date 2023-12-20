import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
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
        required: true
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
    kin: {
        type: String,
        required: true
    },
    kinPhone: {
        type: String,
        required: true
    },
    kinRelationship: {
        type: String,
        required: true
    },
    idCard: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountNumber: {
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