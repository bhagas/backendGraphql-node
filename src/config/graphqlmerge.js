const UserModule = require('../modules/user/graphql.js');


// import * as mahasiswa from'./modules/mahasiswa/controller.js';

let gabungan= [
  {typeDefs:UserModule.typeDefs, resolvers: UserModule.resolvers}
]

module.exports = gabungan;