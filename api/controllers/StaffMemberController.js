import StaffModels from "../models/StaffMemberModel.js";

//Display Data
export const getAllDetails = async (req, res, next) => {
    let staffMember;
    try {
        staffMember = await StaffModels.find();
    } catch (err) {
        console.log(err);
    }
    if (!staffMember) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ staffMember });
};

//Insert Data
export const addData = async (req, res, next) => {
    const { firstName, lastName, gender, address, phone, memberID, memberType, dob, email } = req.body;

    let staffMember;
    try {
        staffMember = new StaffModels({
            firstName, lastName, gender, address, phone, memberID, memberType, dob, email
        });
        await staffMember.save();
    } catch (err) {
        console.log(err);
    }
    if (!staffMember) {
        return res.status(404).json({ message: "Unable to add data" });
    }
    return res.status(200).json({ staffMember });
};

//Get by Id
export const getById = async (req, res, next) => {
    const id = req.params.id;
    let staffMember;
    try {
        staffMember = await StaffModels.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!staffMember) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ staffMember });
};

//Update Details
export const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { firstName, lastName, gender, address, phone, memberID, memberType, dob, email } =
        req.body;

    let staffMember;

    try {
        staffMember = await StaffModels.findByIdAndUpdate(id, {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            address: address,
            phone: phone,
            memberID: memberID,
            memberType: memberType,
            dob: dob,
            email: email,
        });
        staffMember = await staffMember.save();
    } catch (err) {
        console.log(err);
    }
    if (!staffMember) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ staffMember });
};

//Delete data
export const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let staffMember;

    try {
        staffMember = await StaffModels.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!staffMember) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ staffMember });
};
