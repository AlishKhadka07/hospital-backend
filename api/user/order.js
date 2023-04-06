const express = require("express");
const router = express.Router();

const app = express();
//middleware calling
const auth = require("./../../middleware/auth/authjwt");

//Controller Calling
const adminOrderController = require("./../../controller/admin/order");
const orderController = require("./../../controller/user/order");

router.post(
  "/add-order",
  [auth.verifyToken],
  [auth.isLogedOut],
  orderController.addOrder
);

router.get(
  "/get-my-order",
  [auth.verifyToken],
  [auth.isLogedOut],
  orderController.getMyOrder
);

router.get(
  "/get-all-order",
  [auth.verifyToken],
  [auth.isLogedOut],
  adminOrderController.getOrder
);

module.exports = router;
