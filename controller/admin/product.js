const { Categorys } = require("./../../model/index");
const db = require("./../../model/index");
const Product = db.Products;

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

//Post Product
exports.addProduct = async (req, res) => {
  //destruction
  const {
    name,
    mg,
    description,
    type,
    manufacturer,
    categoryId,
    quantity,
    price,
  } = req.body;

  const image = req.file.filename;

  //making data object
  let data = {
    name,
    mg,
    description,
    type,
    manufacturer,
    image,
    categoryId,
    quantity,
    price,
  };
  //validation
  if (
    !name ||
    !mg ||
    !description ||
    !type ||
    !manufacturer ||
    !image ||
    !categoryId ||
    !quantity ||
    !price
  ) {
    return responseGenerator(res, 400, "Please fill up the data", data);
  }

  let dbOperation = await Product.create({ ...data });
  responseSender(res, dbOperation);
};

//Get Product
exports.getProduct = async (req, res) => {
  let dbOperation = await Product.findAll({
    include: {
      model: Categorys,
    },
  });
  responseSender(res, dbOperation);
};

//Get Single Product
exports.getSingleProduct = async (req, res) => {
  let dbOperation = await Product.findByPk(req.params.id, {
    include: {
      model: Categorys,
    },
  });
  responseSender(res, dbOperation);
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  let dbOperation = await Product.destroy({ where: { id: req.params.id } });
  responseSender(res, dbOperation);
};

//update Product
exports.updateProduct = async (req, res) => {
  //destruction
  const {
    name,
    mg,
    description,
    type,
    manufacturer,
    categoryId,
    quantity,
    price,
  } = req.body;

  let data = {};
  if (req.file) {
    const image = req.file.filename;
    //making data object
    data = {
      name,
      mg,
      description,
      type,
      manufacturer,
      image,
      categoryId,
      quantity,
      price,
    };
    //validation
    if (
      !name ||
      !mg ||
      !description ||
      !type ||
      !manufacturer ||
      !image ||
      !categoryId ||
      !quantity ||
      !price
    ) {
      return responseGenerator(res, 400, "Please fill up the data", "");
    }
  } else {
    //making data object
    data = {
      name,
      mg,
      description,
      type,
      manufacturer,
      categoryId,
      quantity,
      price,
    };
    //validation
    if (
      !name ||
      !mg ||
      !description ||
      !type ||
      !manufacturer ||
      !categoryId ||
      !quantity ||
      !price
    ) {
      return responseGenerator(res, 400, "Please fill up the data", "");
    }
  }

  let dbOperation = await Product.update(
    { ...data },
    { where: { id: req.params.id } }
  );
  responseSender(res, dbOperation);
};
