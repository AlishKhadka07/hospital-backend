const db = require("./../../model/index");
const Doctor = db.Doctors;

//response Generator
let responseGenerator = (res, statusCode, message, data) => {
  res.status(statusCode).send({
    data,
  });
};

let responseSender = (res, dbOperation) => {
  if (dbOperation) {
    return responseGenerator(res, 200, "Success", dbOperation);
  }

  if (!dbOperation) {
    return responseGenerator(res, 400, "Error", dbOperation);
  }
};

//Post Doctor
exports.addDoctor = async (req, res) => {
  console.log(req.file);
  const { name, department, apointment_charge, qualification } = req.body;

  const image = req.file.filename;

  //validation
  if (!name || !department || !apointment_charge || !qualification || !image) {
    return responseGenerator(res, 400, "Please fill up the data", "");
  }

  let data = {
    name,
    department,
    apointment_charge,
    qualification,
    image,
  };

  let dbOperation = await Doctor.create({ ...data });
  responseSender(res, dbOperation);
};

//Get Doctor
exports.getDoctor = async (req, res) => {
  let dbOperation = await Doctor.findAll();
  responseSender(res, dbOperation);
};

//Get Single Doctor
exports.getSingleDoctor = async (req, res) => {
  let dbOperation = await Doctor.findByPk(req.params.id);
  responseSender(res, dbOperation);
};

//Delete Doctor
exports.deleteDoctor = async (req, res) => {
  let dbOperation = await Doctor.destroy({ where: { id: req.params.id } });
  responseSender(res, dbOperation);
};

//update Doctor
exports.updateDoctor = async (req, res) => {
  const { name, department, apointment_charge, qualification } = req.body;

  let data = {};

  if (req.file) {
    const image = req.file.filename;
    //validation
    if (
      !name ||
      !department ||
      !apointment_charge ||
      !qualification ||
      !image
    ) {
      return responseGenerator(res, 400, "Please fill up the data", "");
    }

    data.name = req.body.name;
    data.department = req.body.department;
    data.apointment_charge = req.body.apointment_charge;
    data.qualification = req.body.qualification;
    data.image = image;
  } else {
    if (!name || !department || !apointment_charge || !qualification) {
      return responseGenerator(res, 400, "Please fill up the data", "");
    }

    data.name = req.body.name;
    data.department = req.body.department;
    data.apointment_charge = req.body.apointment_charge;
    data.qualification = req.body.qualification;
  }

  let dbOperation = await Doctor.update(
    { ...data },
    { where: { id: req.params.id } }
  );
  console.log(dbOperation);
  responseSender(res, dbOperation);
};
