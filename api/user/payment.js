const express = require("express");
const router = express.Router();

const jwtMiddleware = require("./../../middleware/auth/authjwt");

//Controller calling
const paymentController = require("./../../controller/user/payment");

//Admin Routes
router.post(
  "/payment/:id",
  [jwtMiddleware.verifyToken],
  [jwtMiddleware.isLogedOut],
  paymentController.addPayment
);

module.exports = router;
