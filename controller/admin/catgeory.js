const db = require("./../../model/index");
const Category = db.Categorys;

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

//Post Category
exports.addCatgeory = async (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  let { name } = req.body;

  //validation
  if (!name || !image) {
    return responseGenerator(res, 400, "Please fill up the data", "");
  }

  let data = {
    name,
    image,
  };

  let dbOperation = await Category.create(data);
  responseSender(res, dbOperation);
};

//Get Catgeory
exports.getCategory = async (req, res) => {
  let dbOperation = await Category.findAll();
  responseSender(res, dbOperation);
};

//Get Single Category
exports.getSingleCategory = async (req, res) => {
  let dbOperation = await Category.findByPk(req.params.id);
  responseSender(res, dbOperation);
};

//Delete Category
exports.deleteCategory = async (req, res) => {
  let dbOperation = await Category.destroy({ where: { id: req.params.id } });
  responseSender(res, dbOperation);
};

//update Category
exports.updateCategory = async (req, res) => {

  
  const image = req.file.filename;
  let { name } = req.body;
  //validation
  if (!name || !image) {
    return responseGenerator(res, 400, "Please fill up the data", "");
  }

  let data = {
    name,
    image,
  };

  let dbOperation = await Category.update(data, {
    where: { id: req.params.id },
  });
  responseSender(res, dbOperation);
};
