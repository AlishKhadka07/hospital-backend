const db = require("./../../model/index");
const Staff = db.Staff;

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
exports.addStaff = async (req, res) => {
  console.log(req.file);
  const { name, phone_number, email } = req.body;

  const image = req.file.filename;

  //validation
  if (!name || !email || !phone_number || !image) {
    return responseGenerator(res, 400, "Please fill up the data", "");
  }

  let data = {
    name,
    email,
    phone_number,
    image,
  };

  let dbOperation = await Staff.create({ ...data });
  responseSender(res, dbOperation);
};

//Get Doctor
exports.getStaff = async (req, res) => {
  let dbOperation = await Staff.findAll();
  responseSender(res, dbOperation);
};

//Get Single Doctor
exports.getSingleDoctor = async (req, res) => {
  let dbOperation = await Doctor.findByPk(req.params.id);
  responseSender(res, dbOperation);
};

//Delete Doctor
exports.deleteStaff = async (req, res) => {
  let dbOperation = await Staff.destroy({ where: { id: req.params.id } });
  responseSender(res, dbOperation);
};

//update Doctor
exports.updateStaff = async (req, res) => {
  const { name, email, phone_number } = req.body;

  let data = {};

  if (req.file) {
    const image = req.file.filename;
    //validation
    if (!name || !email || !phone_number || !image) {
      return responseGenerator(res, 400, "Please fill up the data", "");
    }

    data.name = req.body.name;
    data.email = req.body.email;
    data.phone_number = req.body.phone_number;
    data.image = image;
  } else {
    if (!name || !email || !phone_number || !image) {
      return responseGenerator(res, 400, "Please fill up the data", "");
    }

    data.name = req.body.name;
    data.email = req.body.email;
    data.phone_number = req.body.phone_number;
  }

  let dbOperation = await Staff.update(
    { ...data },
    { where: { id: req.params.id } }
  );
  console.log(dbOperation);
  responseSender(res, dbOperation);
};
