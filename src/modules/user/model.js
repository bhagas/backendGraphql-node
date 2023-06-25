const {DataTypes } = require('sequelize');
const koneksi = require('../../config/koneksi.js');

const User = koneksi.define('users', {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
        primaryKey: true
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
    email:{
        type: DataTypes.STRING
    }
  }, {
    // Other model options go here
    freezeTableName: true
  });
module.exports = User;