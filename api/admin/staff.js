const express = require("express");
const multer = require("multer");
const app = express();
const router = express.Router();

//Middleware Calling
const auth = require("./../../middleware/auth/authjwt");

//contyroller Calling
const staffController = require("./../../controller/admin/staff");

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

router.get("/staffs", staffController.getStaff);
// router.get(
//   "/single-staff/:id",
//   [auth.verifyToken],
//   [auth.isLogedOut],
//   staffController.getSingleDoctor
// );
router.get(
  "/delete-staff/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  staffController.deleteStaff
);
router.post(
  "/add-staff",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  staffController.addStaff
);
router.post(
  "/update-staff/:id",
  [auth.verifyToken],
  [auth.isLogedOut],
  filehandler,
  staffController.updateStaff
);

module.exports = router;
