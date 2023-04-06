module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define('orderDetail', {
        quantity: {
            type: Sequelize.STRING
        }
    })
    return OrderDetail
}