const db = require("../index");
const { Model, DataTypes } = require("sequelize");

class Book extends Model {}

Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maturityRating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize: db, modelName: "book", timestamps: false }
);

Book.prototype.reduceStock = function (num) {
  this.decrement("stock", { by: num });
};

module.exports = Book;
