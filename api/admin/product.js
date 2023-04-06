const express = require("express");
const multer = require("multer");

const app = express();
const router = express.Router();

//Middleware Calling
const auth = require("./../../middleware/auth/authjwt");

//contyroller Calling
const productController = require("./../../controller/admin/product");

// File Uploading with multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  console.log(req.body);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let filehandler = app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
//File Uploading Ends

router.get(
  "/products",
  [auth.verifyToken],
  [auth.isLogedOut],
  productController.getProduct
);
router.get(
  "/single-product/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  productController.getSingleProduct
);
router.get(
  "/delete-product/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  productController.deleteProduct
);
router.post(
  "/add-product",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  productController.addProduct
);
router.post(
  "/update-product/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  productController.updateProduct
);

module.exports = router;
