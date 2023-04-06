const express = require("express");
const router = express.Router();

//controller Calling
const productController = require("./../../controller/user/product");

//middleware Calling
const Auth = require("./../../middleware/auth/authjwt");

router.get("/user-all-products", productController.getAllProduducts);

router.get(
  "/user-products",
  [Auth.verifyToken],
  [Auth.isLogedOut],
  productController.getAuthAllProducts
);

module.exports = router;
