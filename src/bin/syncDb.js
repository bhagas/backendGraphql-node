const koneksi = require('../config/koneksi');

let normalizedPath = require("path").join(__dirname, "../modules");
// console.log(normalizedPath);
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    let normalize = require("path").join(__dirname, "../modules/" + file);
    require("fs").readdirSync(normalize).forEach(function (file2) {
        if (file2 == "model.js") {
            require(`../modules/${file}/model.js`)
        }
    });
});

koneksi.sync({ alter: true }).then(() => {
    console.log('Database Berhasil di Sinkronisasi')
    console.log('disconnecting...')
    process.exit(0);
}).catch(e => {
    console.log(e)
});