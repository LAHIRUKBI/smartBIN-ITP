import mongoose from "mongoose";

const { Schema } = mongoose;

const StaffMemberSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    memberID: {
        type: String,
        required: true,
    },
    memberType: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const StaffMember = mongoose.model("StaffMember", StaffMemberSchema);

export default StaffMember;
