const express = require("express");
const multer = require("multer");
const app = express();
const router = express.Router();

//Middleware Calling
const auth = require("./../../middleware/auth/authjwt");

//contyroller Calling
const doctorController = require("./../../controller/admin/doctor");

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

router.get("/doctors", doctorController.getDoctor);
router.get(
  "/single-doctor/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  doctorController.getSingleDoctor
);
router.get(
  "/delete-doctor/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  doctorController.deleteDoctor
);
router.post(
  "/add-doctor",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  doctorController.addDoctor
);
router.post(
  "/update-doctor/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  doctorController.updateDoctor
);

module.exports = router;
