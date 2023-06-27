var jwt = require('jsonwebtoken');
let key = process.env.JWT_KEY
class Jewete{
 static  generate(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, key, function(err, token) {
            if(err){
                reject(err)
            }else{
                resolve(token)
            }
           
          });
    })
}
static  verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, function(err, decoded) {
            if(err){
                reject(err)
            }else{
                resolve(decoded)
            }
          });
    })
}
}




module.exports = Jewete;