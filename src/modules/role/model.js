const {DataTypes } = require('sequelize');
const koneksi = require('../../config/koneksi.js');

const Role = koneksi.define('roles', {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
        primaryKey: true
      },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code:{
        type: DataTypes.STRING
    }
  }, {
    // Other model options go here
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'deleted'
  });
module.exports = Role;