const {DataTypes } = require('sequelize');
const koneksi = require('../../config/koneksi');

export const Dosen = koneksi.define('Dosen', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gelar: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    alamat: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
    jurusan:{
        type: DataTypes.STRING
    }
  }, {
    // Other model options go here
  });
