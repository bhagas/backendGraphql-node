const bcrypt = require('../../helper/bcrypt');

async function name(params) {
   console.log(await bcrypt.gen('grafika9'))
}
name()