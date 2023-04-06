const express = require("express");
const router = express.Router();

//Middleware
const auth = require("./../../middleware/auth/authjwt");

const appointmentController = require("./../../controller/admin/appointment");

router.get(
  "/admin-all-appointment",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.getAllAppointments
);
router.get(
  "/admin-delete-appointment/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.deleteAppointment
);

router.post(
  "/changestatus/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.changeAppointmentStatus
);

module.exports = router;
