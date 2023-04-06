module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define('rating', {
        rating: {
            type: Sequelize.STRING
        },
        review: {
            type: Sequelize.STRING
        }
    })
    return Rating
}