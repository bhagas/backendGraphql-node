const db = require('../../config/koneksi.js');
const { QueryTypes } = require('sequelize');
const roleModel = require('./model.js');
const gql = require('graphql-tag');
const uuid = require('uuid');
const typeDefs=
  gql`
  extend type Query {
 
      roles: rolesResult
      "Query untuk user by id"
      role(id: ID!): Role
  }
  extend type Mutation {
    createRole(inputRole: RoleInput): Output
    updateRole(id: ID!, input: RoleInput): Output
    removeRole(id: ID!): Output
  }


type rolesResult{
  data:[Role],
  message:String,
  status:Int
}
  
  input RoleInput {
    role_name: String,
    code: String
  }


  type Role {
     id: ID!,
     role_name: String,
     code: String,
     createdAt: String,
     updatedAt:String
  }
`

const resolvers= {
  Query: {
    roles: async (obj, args, context, info) => {

      let dt = await db.query('select * from roles where deleted is null order by "createdAt" ASC');
      //bisa array return nya
      return {data: dt[0], status:200, message:'Success'};
       
    },
    role: async (obj, args, context, info) =>
        {
           
            let dt = await db.query(`select * from roles where id= $1`,{bind:[args.id], type:QueryTypes.SELECT});
            //harus object return nya
            return dt[0];
        },
},
Mutation:{
  createRole: async (_, {inputRole})=>{
    try {
    inputRole.id=uuid.v4()
 
     await roleModel.create(inputRole)
        return {
            status: '200',
            message: 'Success'
        }
    } catch (error) {
      console.log(error);
      return {
        status: '500',
        message: 'Failed',
        error: JSON.stringify(error)
    }
    }
   
  },
 
  updateRole: async (_, {id, input})=>{
      console.log(id, input);
      await roleModel.update(
       input,
        { where: { id } }
      )
      return {
          status: '200',
          message: 'Updated'
      }
  },

  removeRole: async (_, {id})=>{

    try {
      await roleModel.destroy(
        { where: { id } }
      )
     return {
         status: '200',
         message: 'Removed'
     }
    } catch (error) {
      return {
        status: '500',
        message: 'Internal Server Error',
        error:JSON.stringify(error)
    }
   } 
}
}
}


module.exports = {typeDefs, resolvers}
