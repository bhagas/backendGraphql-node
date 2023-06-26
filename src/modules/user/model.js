import {DataTypes } from'sequelize';
import koneksi from'../../config/koneksi.js';

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
export default User;