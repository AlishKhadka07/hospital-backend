const express = require('express')
const multer = require('multer')
const router = express.Router()

const app = express()
//middleware calling
const auth = require('./../../middleware/auth/authjwt')

//Controller Calling
const cartController = require('./../../controller/user/cart')

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

router.post('/add-cart/:productId', [auth.verifyToken], [auth.isLogedOut], filehandler, cartController.addCart )
router.post('/update-cart/:id', [auth.verifyToken], [auth.isLogedOut], cartController.updateCart )
router.get("/delete-cart/:id", [auth.verifyToken], [auth.isLogedOut], cartController.deleteCart )
router.get("/my-cart", [auth.verifyToken], [auth.isLogedOut], cartController.getMyCart )

module.exports = router