import mongoose from "mongoose";

const { Schema } = mongoose;

const StaffMemberSalarySchema = new Schema({
    memberID: {
        type: String,
        required: true,
    },
    memberType: {
        type: String,
        required: true,
    },
    baseSalary: {
        type: String,
        required: true,
    },
    OvertimeHours: {
        type: String,
        required: true,
    },
    OvertimeRate: {
        type: String,
        required: true,
    },
    OvertimePay: {
        type: String,
        required: true,
    },
    Bonuses: {
        type: String,
        required: true,
    },
    Deductions: {
        type: String,
        required: true,
    },
    TotalSalary: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const StaffMemberSalary = mongoose.model("StaffMemberSalary", StaffMemberSalarySchema);

export default StaffMemberSalary;
