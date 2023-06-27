const db = require('../../config/koneksi.js');
const { QueryTypes } = require('sequelize');
const userModel = require('./model.js');
const gql = require('graphql-tag');
const uuid = require('uuid');
const jwt = require('../../helper/jwt.js')
const typeDefs=
  gql`
  extend type Query {
    """
    Deskripsi untuk user
    berisi tentang profil user
    """
      users: [User]
      "Query untuk user by id"
      user(id: ID!, name: String): User
  }
  extend type Mutation {
    createUser(input: UserInput): Output
    updateUser(id: ID!, input: UserInput): Output
    login(input: LoginInput): OutputLogin
  }



  
  input UserInput {
    name: String,
    email: String
  }
  input LoginInput {
    email: String
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
     updatedAt:String
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
    users: async () => {
        let dt = await db.query('select * from users');
        //bisa array return nya
        return dt[0];
    },
    user: async (obj, args, context, info) =>
        {
            console.log(args);
            let dt = await db.query(`select * from Users where id= '${args.id}'`);
            //harus object return nya
            return dt[0][0];
        },
},
Mutation:{
  createUser: async (_, {input})=>{
    try {
    //  let file = await saveFile(await image);
   
      input.id=uuid.v4()
      // input.password=await enkrip.hash(input.password)
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
      let token = await jwt.generate(dt[0])
        return {
            status: '200',
            message: 'Success',
            token,
            user: dt[0]
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
  updateUser: async (_, {id, input})=>{
      console.log(id, input);
      return {
          status: '200',
          message: 'Berhasil Update'
      }
  }
}
}


module.exports = {typeDefs, resolvers}
