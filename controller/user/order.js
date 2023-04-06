const product = require("../../model/admin/product");
const orderDetail = require("../../model/user/orderDetail");
const {
  Catrs,
  Products,
  OrderDetails,
  Orders,
} = require("./../../model/index");
const db = require("./../../model/index");
const Order = db.Orders;

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

//Add To Order
exports.addOrder = async (req, res) => {
  console.log(req.body);
  let cart = await Catrs.findAll({
    where: {
      userId: req.userId,
    },
  });

  let order = await Order.create({ ...req.body, userId: req.userId });

  let orderDetail;
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i]);
    orderDetail = await OrderDetails.create({
      quantity: cart[i].quantity,
      orderId: order.id,
      productId: cart[i].productId,
      userId: req.userId,
    });

    let destroy_cart_item = Catrs.destroy({
      where: {
        id: cart[i].id,
      },
    });
  }
  responseSender(res, orderDetail);
};

//Get Orders
exports.getMyOrder = async (req, res) => {
  let order = await Order.findAll({
    where: {
      userId: req.userId,
    },
    include: [
      {
        model: OrderDetails,
        include: {
          model: Products,
        },
      },
    ],
  });

  let orderss = await OrderDetails.findAll();
  let product = await Products.findAll();

  // let newOrderDetails = [];
  // orderss.forEach((element) => {
  //   product.forEach((p) => {
  //     if (element.productId === p.id) {
  //       order.push(p);
  //     }
  //   });
  // });

  responseSender(res, order);
};
