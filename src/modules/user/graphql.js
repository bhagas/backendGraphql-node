const db = require('../../config/koneksi.js')
const { createModule, gql } = require('graphql-modules');
const typeDefs=
  gql`
  "Query untuk user"
   type Query {
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
  type Mutation {
    createUser(input: UserInput): Output
    updateUser(id: ID!, input: UserInput): Output
  }


  type User {
     id: ID!,
     username: String,
     password: String,
     email: String
  }
  type Output{
    status:String,
    pesan:String
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
        console.log(input);
        return {
            status: '200',
            pesan: 'Berhasil Simpan'
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
const UserModule = createModule({
  id: 'user-module',
  typeDefs: [typeDefs],
  resolvers: [resolvers]
});

module.exports = UserModule
