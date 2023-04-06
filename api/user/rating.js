const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth/authjwt')

const ratingController = require('../../controller/user/rating')

router.post('/add-rating', [auth.verifyToken], [auth.isLogedOut], ratingController.addRating)
router.get('/delete-rating', [auth.verifyToken], [auth.isLogedOut], ratingController.deleteRating )
router.post('/update-rating', [auth.verifyToken], [auth.isLogedOut], ratingController.updateRating)

module.exports = router