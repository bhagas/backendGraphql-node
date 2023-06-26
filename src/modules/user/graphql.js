import db from'../../config/koneksi.js'
import userModel from './model.js';
import gql from 'graphql-tag';
import { v4 as uuidv4 } from 'uuid';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import saveFile from '../../helper/file.js';
import enkrip from '../../helper/bcrypt.js'

export const typeDefs=
  gql`
  scalar Upload

  extend type Query {
    """
    Deskripsi untuk user
    berisi tentang profil user
    """
      users: [User]
      "Query untuk user by id"
      user(id: ID!, nama: String): User
  }
  input UserInput {
    username: String,
    password: String,
    email: String
  }
  input LoginInput {
    username: String,
    password: String
  }
  extend type Mutation {
    createUser(image: Upload!,input: UserInput): Output
    updateUser(id: ID!, input: UserInput): Output
    login(input: LoginInput): OutputLogin
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type User {
     id: ID!,
     username: String,
     password: String,
     email: String
  }
  type OutputLogin{
    status:String,
    pesan:String,
    error:String,
    token:String,
    user:String
  }
  type Output{
    status:String,
    pesan:String,
    error:String
  }
`

export const resolvers= {
  Upload: GraphQLUpload,
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
    createUser: async (_, {image, input})=>{
      try {
       let file = await saveFile(await image);

        input.id=uuidv4();
        input.password=await enkrip.hash(input.password)
       await userModel.create(input)
          return {
              status: '200',
              pesan: 'Berhasil Simpan'
          }
      } catch (error) {
        return {
          status: '500',
          pesan: 'gagal',
          error: JSON.stringify(error)
      }
      }
     
    },
    login: async (_, {input})=>{
      try {
        input.id=uuidv4();
        input.password=await enkrip.hash(input.password)
   
          return {
              status: '200',
              pesan: 'Berhasil Simpan'
          }
      } catch (error) {
        return {
          status: '500',
          pesan: 'gagal',
          error
      }
      }
     
    },
    updateUser: async (_, {id, input})=>{
        console.log(id, input);
        return {
            status: '200',
            pesan: 'Berhasil Update'
        }
    }
  }
}

