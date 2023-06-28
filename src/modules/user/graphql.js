const db = require('../../config/koneksi.js');
const { QueryTypes } = require('sequelize');
const userModel = require('./model.js');
const rolePoolModel = require('../rolePool/model.js');
const gql = require('graphql-tag');
const uuid = require('uuid');
const jwt = require('../../helper/jwt.js');
const typeDefs=
  gql`
  extend type Query {
    """
    Deskripsi untuk user
    berisi tentang profil user
    """
      users: usersResult
      "Query untuk user by id"
      user(id: ID!): User
  }
  extend type Mutation {
    createUser(input: UserInput): Output
    updateUser(id: ID!, input: UserInput): Output
    login(input: LoginInput): OutputLogin
    setRole(idUser:String!, roles:[inputRole]): Output
  }


type usersResult{
  data:[User],
  message:String,
  status:Int
}
  
  input UserInput {
    name: String,
    email: String
  }
  input LoginInput {
    email: String
  }
  input inputRole{
    roleId:String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type User {
     id: ID!,
     name: String,
     email: String,
     createdAt: String,
     updatedAt:String,
     roles:[Role]
  }
  type OutputLogin{
    status:String,
    message:String,
    error:String,
    token:String,
    user:User
  }
  type Output{
    status:String,
    message:String,
    error:String
  }
  
`

const resolvers= {
  Query: {
    users: async (obj, args, context, info) => {
      try {
        let dt = await db.query('select * from users',{type: QueryTypes.SELECT});
   
        for (let i = 0; i < dt.length; i++) {
          dt[i].roles= await db.query(`select b.id, b.code, b.role_name from role_pool a join roles b on a."roleId" = b.id where a."userId"= $1`, { bind: [dt[i].id],type: QueryTypes.SELECT });
        }
     
        return {data: dt, status:200, message:'Success'};
      } catch (error) {
        console.log(error);
      }
    
       
    },
    user: async (obj, args, context, info) =>
        {
           
          let dt = await db.query(`select * from Users where id= $1`,{bind:[args.id], type:QueryTypes.SELECT});
          //harus object return nya
            return dt[0];
        },
},
Mutation:{
  createUser: async (_, {input})=>{
    try {
    //  let file = await saveFile(await image);
   
      input.id=uuid.v4()
      // input.password=await enkrip.hash(input.password)
      input.confirmation_code = await jwt.generate(input.id, '1h');
     await userModel.create(input)
        return {
            status: '200',
            message: 'Berhasil Simpan'
        }
    } catch (error) {
      console.log(error);
      return {
        status: '500',
        message: 'gagal',
        error: JSON.stringify(error)
    }
    }
   
  },
  login: async (_, {input})=>{
    try {

      // input.password=await enkrip.hash(input.password)
      let dt = await db.query(`select * from users where email= $1`, { bind: [input.email],type: QueryTypes.SELECT });
     if(dt.length){
      dt[0].roles= await db.query(`select b.id, b.code, b.role_name from role_pool a join roles b on a."roleId" = b.id where a."userId"= $1`, { bind: [dt[0].id],type: QueryTypes.SELECT });
   
      let token = await jwt.generate(dt[0], '24h')
        return {
            status: '200',
            message: 'Success',
            token,
            user: dt[0]
        }
     }else{
      return {
        status: '403',
        message: 'Email is not registered',
      
    }
     }
     
    } catch (error) {
      console.log(error);
      return {
        status: '500',
        message: 'gagal',
        error
    }
    }
   
  },
  updateUser: async (_, {idUser, input})=>{
      // console.log(idUser, input);
      await userModel.update(
        input,
         { where: { id:idUser } }
       )
      return {
          status: '200',
          message: 'Berhasil Update'
      }
  },
  setRole: async (_, {idUser, roles})=>{
    try {
 
      const result = await db.transaction(async (t) => {
        await rolePoolModel.destroy({
          where: {
            userId:idUser
          },
          force: true,
          transaction: t
        });
        for (let i = 0; i < roles.length; i++) {
          roles[i].id = uuid.v4();
          roles[i].userId = idUser;
          
        }
        // console.log(idUser, roles);
       await rolePoolModel.bulkCreate(roles, {transaction:t})
          return {
            status: '200',
            message: 'Berhasil Update'
        }
      })

      return result
    } catch (error) {
      console.log(error);
      return {
        status: '500',
        message: 'Failed',
        error
    }
    }
   
}
}
}


module.exports = {typeDefs, resolvers}
