const { Users } = require("./../../model/index");
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

//Get All Appointment
exports.getAllAppointments = async (req, res) => {
  let dbOperation = await Appointment.findAll({
    include: [
      {
        model: Doctor,
      },
      {
        model: Users,
      },
    ],
  });

  responseSender(res, dbOperation);
};

//Delete Appointment
exports.deleteAppointment = async (req, res) => {
  let dbOperation = await Appointment.destroy({
    where: {
      id: req.params.id,
    },
  });
  responseSender(res, dbOperation);
};

exports.changeAppointmentStatus = async (req, res) => {
  console.log(req.body);
  try {
    let changeStatus = await Appointment.findOne({
      where: {
        id: req.params.id,
      },
    });
    changeStatus.appoinmentStatus = "completed";
    await changeStatus.save();

    res.json({
      status: 200,
      message: "successfully changed status",
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};
