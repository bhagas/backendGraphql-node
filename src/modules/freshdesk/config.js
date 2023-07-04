const axios = require('axios');
const API_KEY = porcess.env.FD_API_KEY;
const FD_ENDPOINT = porcess.env.FD_ENDPOINT;
const URL =  "https://" + FD_ENDPOINT + ".freshdesk.com";

class Fd{
    static getAllTickets(){
        return new Promise(async (resolve, reject) => {
            try {
                let PATH = "/api/v2/tickets?include=description";
                let dt =    await axios.get(URL+PATH, {
                        auth: {
                          username: API_KEY,
                          password: "X"
                        }
                      });
                      resolve(dt.data)
            } catch (error) {
                    reject(error)
            }
          
        })

    }
}

module.exports =Fd