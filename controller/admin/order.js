const db = require("./../../model/index");
const order = db.Orders;

//response Generator
let responseGenerator = (res, statusCode, message, data) => {
  res.status(statusCode).send({
    data,
  });
};

let responseSender = (res, dbOperation) => {
  if (dbOperation) {
    return responseGenerator(res, 200, "Success", dbOperation);
  }

  if (!dbOperation) {
    return responseGenerator(res, 400, "Error", dbOperation);
  }
};

//Get Doctor
exports.getOrder = async (req, res) => {
  let dbOperation = await order.findAll();
  responseSender(res, dbOperation);
};
