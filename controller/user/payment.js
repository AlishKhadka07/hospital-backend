const axios = require("axios");
const order = require("../../model/user/order");
const { Payment } = require("../../model");

//ResponseGenrator
let responseGenrator = (res, statusCode, message, data) => {
  res.status(statusCode).send({
    data,
    message,
  });
};

//resposnse sender
let resposnseSender = (res, dbOperation) => {
  if (dbOperation) {
    return responseGenrator(res, 200, "Success", dbOperation);
  }

  if (!dbOperation) {
    return responseGenrator(res, 200, "Success", dbOperation);
  }
};

exports.addPayment = async (req, res) => {
  const uri = "https://khalti.com/api/v2/payment/verify/";
  const secret = "test_secret_key_0e92d34825544efa8073e9ba124528c5";
  //   const { token, amount } = req.body;

  //Validation

  let data = {
    token: req.body.token,
    amount: req.body.amount,
    userId: req.userId,
  };
  console.log(data);

  let config = {
    Authorization: `Key ${secret}`,
    "Content-Type": "application/json",
  };
  try {
    let payments = await axios.post(uri, data, { headers: config });
    console.log("me", payments.data);

    if (payments.status === 200) {
      await Payment.create({
        userId: req.userId,
        amount: payments.data.amount,
        productId: req.params.id,
      });
      // Update order status in database
      const Order = await order.findOne({
        where: { id: req.params.id },
      });
      Order.paymentStatus = "paid";
      await Order.save();

      res.json({
        status: 200,
        message: "okay payment",
        data: payments.data,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error",
      error: error,
    });
  }

  //   if (payments) {
  //     res.status(200).send({
  //       message: "Success",
  //       data: payments,
  //     });
  //   } else {
  //     res.status(500).send({
  //       message: "Error",
  //     });
  //   }
};
