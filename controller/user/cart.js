const { where } = require("sequelize");
const category = require("../../model/admin/category");
const product = require("../../model/admin/product");
const { Products, Categorys } = require("./../../model/index");
const db = require("./../../model/index");
const Cart = db.Catrs;

//response Generator
let responseGenerator = (res, statusCode, message, data) => {
  res.status(statusCode).send({
    data,
    message,
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

//Add To Cart
exports.addCart = async (req, res) => {
  if (!req.body.quantity) {
    return responseGenerator(res, 400, "Please Fill up The data", "");
  }

  let product = await Products.findByPk(req.params.productId);

  let data = {
    quantity: req.body.quantity,
    userId: req.userId,
    productId: req.params.productId,
  };

  let dbOperation = await Cart.create({ ...data });
  responseSender(res, dbOperation);
};

//Update Cart
exports.updateCart = async (req, res) => {
  if (!req.body.quantity) {
    return responseGenerator(res, 400, "Please Fill up The data", "");
  }

  let data = {
    quantity: req.body.quantity,
    userId: req.userId,
    productId: req.params.productId,
  };

  let dbOperation = await Cart.update(
    { quantity: req.body.quantity },
    {
      where: {
        id: req.params.id,
        userId: req.userId,
        // productId: req.params.productId,
      },
    }
  );

  responseSender(res, dbOperation);
};

//get My Cart
exports.getMyCart = async (req, res) => {
  let dbOperation = await Cart.findAll({
    where: {
      userId: req.userId,
    },
    include: {
      model: Products,
    },
  });
  responseSender(res, dbOperation);
};

//Delete Cart
exports.deleteCart = async (req, res) => {
  console.log(req.params);
  let dbOperation = await Cart.destroy({
    where: {
      id: req.params.id,
    },
  });
  responseSender(res, dbOperation);
};
