const {
  addPrescribtion,
} = require("../../controller/user/prescribtionController");
const { verifyToken } = require("../../middleware/auth/authjwt");

const router = require("express").Router();
const { multer, storage } = require("./../../services/multerConfig");
const upload = multer({ storage: storage });
router
  .route("/addPrescribtion")
  .post(verifyToken, upload.single("image"), addPrescribtion);

module.exports = router;
