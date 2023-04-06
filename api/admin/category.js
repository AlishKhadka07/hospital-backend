const express = require("express");
const router = express.Router();

const multer = require("multer");
const app = express();

//Middleware Calling
const auth = require("./../../middleware/auth/authjwt");

//contyroller Calling
const categoryController = require("./../../controller/admin/catgeory");

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
  "/categories",

  categoryController.getCategory
);
router.get(
  "/single-category/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  categoryController.getSingleCategory
);
router.get(
  "/delete-category/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  categoryController.deleteCategory
);
router.post(
  "/add-category",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  categoryController.addCatgeory
);
router.post(
  "/update-category/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  categoryController.updateCategory
);

module.exports = router;
