const db = require("./../../model/index");
const Appointment = db.Appointments;
const Doctor = db.Doctors;

//response Generator
let responseGenerator = (res, statusCode, message, data) => {
  res.status(statusCode).send({
    data,
    message,
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

//Add Appointment
exports.addAppountment = async (req, res) => {
  const { name, specialist, date, time, gender, phone } = req.body;

  let data = {
    name,
    specialist,
    date,
    time,
    gender,
    phone,
    userId: req.userId,
    doctorId: req.params.doctorId,
  };
  //Validation
  if (!name || !specialist || !date || !time || !gender || !phone) {
    return responseGenerator(res, 400, "Plases fill up the input fields", "");
  }

  let dbOperation = await Appointment.findOrCreate({
    where: {
      doctorId: req.params.doctorId,
      date: date,
    },
    defaults: {
      ...data,
    },
  });
  responseSender(res, dbOperation);
};

//Delete Appointment
exports.deleteAppointment = async (req, res) => {
  let dbOperation = await Appointment.destroy({
    where: { id: req.params.id, userId: req.userId },
  });
  responseSender(res, dbOperation);
};

//Get Appointments
exports.getAllAppointment = async (req, res) => {
  let dbOperation = await Appointment.findAll({
    where: {
      userId: req.userId,
    },
    include: {
      model: Doctor,
    },
  });
  responseSender(res, dbOperation);
};

exports.getAdminAppointment = async (req, res) => {
  let dbOperation = await Appointment.findAll({
    include: {
      model: Doctor,
    },
  });
  responseSender(res, dbOperation);
};

//get Single Appointment
exports.singleAppointment = async (req, res) => {
  let dbOperation = await Appointment.findOne({
    where: { userId: req.userId, id: req.params.id },
    include: {
      model: Doctor,
    },
  });
  responseSender(res, dbOperation);
};

//Update Appointment
exports.updateAppointment = async (req, res) => {
  const { name, specialist, date, time, doctorId } = req.body;

  let data = {
    name,
    specialist,
    date,
    time,
    userId: req.userId,
    doctorId,
  };
  //Validation
  if (!name || !specialist || !date || !time || !doctorId) {
    return responseGenerator(res, 400, "Plases fill up the in[put fields", "");
  }
  let appointmentStatus = await Appointment.findOne({
    where: {
      date: date,
      doctorId: doctorId,
    },
  });

  if (appointmentStatus) {
    return responseGenerator(
      res,
      400,
      "Doctor is already booked for the date",
      ""
    );
  }

  let dbOperation = await Appointment.update(
    { ...data },
    { where: { id: req.params.id, userId: req.userId } }
  );
  responseSender(res, dbOperation);
};
