const {DataTypes, ENUM } = require('sequelize');
const koneksi = require('../../config/koneksi.js');

const User = koneksi.define('users', {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
        primaryKey: true
      },
    name: {
      type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    confirmation_code:{
      type: DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING
    },
    status:{
      type: ENUM("pending", "active", "inactive"),
      defaultValue: "pending",
    }
  }, {
    // Other model options go here
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'deleted'
  });
module.exports = User;