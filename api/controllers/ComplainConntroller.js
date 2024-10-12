import ComplainModels from "../models/ComplainModel.js";

//Display Data
export const getAllDetails = async (req, res, next) => {
  let complaint;
  try {
    complaint = await ComplainModels.find();
  } catch (err) {
    console.log(err);
  }
  if (!complaint) {
    return res.status(404).json({ message: "Data not found" });
  }
  return res.status(200).json({ complaint });
};

//Insert Data
export const addData = async (req, res, next) => {
  const { ComplainID, ComplainType, date, message, reply, name,email } = req.body;

  let complaint;
  try {
    complaint = new ComplainModels({
      ComplainID,
      ComplainType,
      date,
      message,
      reply,
      name,
      email,
    });
    await complaint.save();
  } catch (err) {
    console.log(err);
  }
  if (!complaint) {
    return res.status(404).json({ message: "Unable to add data" });
  }
  return res.status(200).json({ complaint });
};

//Get by Id
export const getById = async (req, res, next) => {
  const id = req.params.id;
  let complaint;
  try {
    complaint = await ComplainModels.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!complaint) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ complaint });
};

//Update Details
export const updateData = async (req, res, next) => {
  const id = req.params.id;
  const { ComplainID, ComplainType, date, message, reply, name, email } =
    req.body;

  let complaint;

  try {
    complaint = await ComplainModels.findByIdAndUpdate(id, {
      ComplainID: ComplainID,
      ComplainType: ComplainType,
      date: date,
      message: message,
      reply: reply,
      name: name,
      email: email,
    });
    complaint = await complaint.save();
  } catch (err) {
    console.log(err);
  }
  if (!complaint) {
    return res.status(404).json({ message: "Unable to Update data" });
  }
  return res.status(200).json({ complaint });
};

//Delete data
export const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let complaint;

  try {
    complaint = await ComplainModels.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!complaint) {
    return res.status(404).json({ message: "Unable to Delete Details" });
  }
  return res.status(200).json({ complaint });
};
