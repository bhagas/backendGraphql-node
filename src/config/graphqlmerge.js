const { createApplication } = require('graphql-modules');

const UserModule = require('../modules/user/graphql.js');


// import * as mahasiswa from'./modules/mahasiswa/controller.js';
let application = createApplication({
    modules: [UserModule],
  });

module.exports = {application}