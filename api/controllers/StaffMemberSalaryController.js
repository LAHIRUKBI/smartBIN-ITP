import StaffSalaryModels from "../models/StaffMemberSalaryModel.js";

//Display Data
export const getAllDetails = async (req, res, next) => {
    let staffMemberSalary;
    try {
        staffMemberSalary = await StaffSalaryModels.find();
    } catch (err) {
        console.log(err);
    }
    if (!staffMemberSalary) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ staffMemberSalary });
};

//Insert Data
export const addData = async (req, res, next) => {
    const { memberID, memberType, baseSalary, OvertimeHours, OvertimeRate, OvertimePay, Bonuses, Deductions, TotalSalary, date } = req.body;

    let staffMemberSalary;
    try {
        staffMemberSalary = new StaffSalaryModels({
            memberID, memberType, baseSalary, OvertimeHours, OvertimeRate, OvertimePay, Bonuses, Deductions, TotalSalary, date
        });
        await staffMemberSalary.save();
    } catch (err) {
        console.log(err);
    }
    if (!staffMemberSalary) {
        return res.status(404).json({ message: "Unable to add data" });
    }
    return res.status(200).json({ staffMemberSalary });
};

//Get by Id
export const getById = async (req, res, next) => {
    const id = req.params.id;
    let staffMemberSalary;
    try {
        staffMemberSalary = await StaffSalaryModels.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!staffMemberSalary) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ staffMemberSalary });
};

//Update Details
export const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { memberID, memberType, baseSalary, OvertimeHours, OvertimeRate, OvertimePay, Bonuses, Deductions, TotalSalary, date } =
        req.body;

    let staffMemberSalary;

    try {
        staffMemberSalary = await StaffSalaryModels.findByIdAndUpdate(id, {
            baseSalary: baseSalary,
            OvertimeHours: OvertimeHours,
            OvertimeRate: OvertimeRate,
            OvertimePay: OvertimePay,
            Bonuses: Bonuses,
            memberID: memberID,
            memberType: memberType,
            Deductions: Deductions,
            TotalSalary: TotalSalary,
            date: date,
        });
        staffMemberSalary = await staffMemberSalary.save();
    } catch (err) {
        console.log(err);
    }
    if (!staffMemberSalary) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ staffMemberSalary });
};

//Delete data
export const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let staffMemberSalary;

    try {
        staffMemberSalary = await StaffSalaryModels.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!staffMemberSalary) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ staffMemberSalary });
};
