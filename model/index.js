const dbConfig = require("./../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Users Model
db.Users = require("./../model/auth/user")(sequelize, Sequelize);
db.Profile = require("./user/profile")(sequelize, Sequelize);
db.Logout = require("./auth/logout")(sequelize, Sequelize);
db.Orders = require("./user/order")(sequelize, Sequelize);
db.Ratings = require("./user/rating")(sequelize, Sequelize);
db.Appointments = require("./user/appointment")(sequelize, Sequelize);
db.Catrs = require("./user/cart")(sequelize, Sequelize);
db.OrderDetails = require("./user/orderDetail")(sequelize, Sequelize);

//Admin Model
db.Categorys = require("./../model/admin/category")(sequelize, Sequelize);
db.Products = require("./../model/admin/product")(sequelize, Sequelize);
db.Doctors = require("./../model/admin/doctor")(sequelize, Sequelize);

db.Staff = require("./../model/admin/staff")(sequelize, Sequelize);
db.Payment = require("./../model/user/payment")(sequelize, Sequelize);

/* RDBMS Connection */

//User Realtion
db.Users.hasOne(db.Profile);
db.Profile.belongsTo(db.Users);

db.Orders.hasMany(db.OrderDetails);
db.OrderDetails.belongsTo(db.Orders);

db.Products.hasMany(db.OrderDetails);
db.OrderDetails.belongsTo(db.Products);

db.Users.hasMany(db.OrderDetails);
db.OrderDetails.belongsTo(db.Users);

db.Users.hasMany(db.Orders);
db.Orders.belongsTo(db.Users);

// db.Products.hasMany(db.Orders)
// db.Orders.belongsTo(db.Products)

db.Catrs.hasOne(db.Orders);
db.Orders.belongsTo(db.Catrs);

db.Products.hasMany(db.Catrs);
db.Catrs.belongsTo(db.Products);

db.Users.hasMany(db.Catrs);
db.Catrs.belongsTo(db.Users);

db.Products.hasMany(db.Ratings);
db.Ratings.belongsTo(db.Products);

db.Users.hasMany(db.Ratings);
db.Ratings.belongsTo(db.Users);

db.Users.hasMany(db.Appointments);
db.Appointments.belongsTo(db.Users);

db.Doctors.hasMany(db.Appointments);
db.Appointments.belongsTo(db.Doctors);

//Admin Relation
db.Categorys.hasMany(db.Products);
db.Products.belongsTo(db.Categorys);

// payment
db.Users.hasMany(db.Payment);
db.Payment.belongsTo(db.Users);

db.Orders.hasMany(db.Payment);
db.Payment.belongsTo(db.Orders);

module.exports = db;
