const db = require('./../../model/index')
const Rating = db.Ratings

//response Generator
let responseGenerator = (res, statusCode, message, data) => {
    res.status(statusCode).send({
        data,
        message
    })
}

let responseSender = (res, dbOperation) => {
    if(dbOperation) {
        return responseGenerator(res, 200, 'Success', dbOperation)
    }   

    if(!dbOperation) {
        return responseGenerator(res, 400, 'Error', dbOperation)
    }
}


//add Rating
exports.addRating = async (req, res) => {
    const {
        rating,
        review
    } = req.body

    if(!rating || !review  || !req.params.productId) {
        return responseGenerator(res, 400, 'Please fill up the input fields', '')
    }
    let data = {
        rating,
        review,
        userId: req.userId,
        productId: req.params.productId
    }

    let dbOperation = await Rating.findOrCreate({
        where: {
            userId: req.userId
        },
        defaults: {
            ...data
        }
    })
    responseSender(res, dbOperation)
}

//Delete Rating
exports.deleteRating = async (Req, res) => {
    let dbOperation = await Rating.destroy({
        where: {
            id: req.params.id
        }
    })

    responseSender(res, dbOperation)
}

//Update Rating
exports.updateRating = async (req, res) => {
    let dbOperation = await Rating.update({...req.body}, {where: {id: req.params.id, userId: req.userId}})
    responseSender(res, dbOperation)
}