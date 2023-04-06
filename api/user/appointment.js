const express = require("express");
const router = express.Router();

//Middleware Calling
const auth = require("./../../middleware/auth/authjwt");

//contyroller Calling
const appointmentController = require("./../../controller/user/appointment");

router.get(
  "/appointments",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.getAllAppointment
);
router.get(
  "/single-appointment/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.singleAppointment
);
router.get(
  "/delete-appointment/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.deleteAppointment
);
router.post(
  "/add-appointment/:doctorId",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.addAppountment
);
router.post(
  "/update-appointment/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  appointmentController.updateAppointment
);

module.exports = router;
