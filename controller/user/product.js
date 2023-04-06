const { Categorys } = require("./../../model/index");
const db = require("./../../model/index");
const Product = db.Products;

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

//Get all Product
exports.getAllProduducts = async (req, res) => {
  let dbOperation = await Product.findAll({
    include: {
      model: Categorys,
    },
  });
  responseSender(res, dbOperation);
};

//get Auth ALl Products
exports.getAuthAllProducts = async (req, res) => {
  let dbOperation = await Product.findAll();
  responseSender(res, dbOperation);
};
