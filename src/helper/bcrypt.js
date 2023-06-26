import bcrypt from'bcrypt';
const saltRounds = 10;

export default class Enkrip{
    static hash(myPlaintextPassword){
        return new Promise((yes,no)=>{
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if(err){
                    no(err)
                }
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                    if(err){
                        no(err)
                    }else{
                        yes(hash)
                    }
                });
            });
        })
      
    }

    static compare(hash, myPlaintextPassword){
        return new Promise((yes,no)=>{
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            if(err){
                no(err)
            }else{
                yes(hash)
            }
        });
     })
    }
}