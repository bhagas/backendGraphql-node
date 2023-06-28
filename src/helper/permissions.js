const { chain,not,and, or, rule, shield } = require("graphql-shield");
const db = require('../config/koneksi');
const { QueryTypes } = require('sequelize');

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {

  if(ctx.user !== null){
  try {
    let user= await db.query(`select * from users where id= $1`, { bind: [ctx.user.id],type: QueryTypes.SELECT });
  
      if(user.length){
       user[0].roles= await db.query(`select b.id, b.code, b.role_name from role_pool a join roles b on a."roleId" = b.id where a."userId"= $1`, { bind: [user[0].id],type: QueryTypes.SELECT });
      }
      ctx.user = user[0];
      return true;
  } catch (error) {
    console.log(error);
    return new Error('Not Authenticated');
  }
     
  } else{
      return new Error('Not Authenticated');
  }
 
})


const isActive = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  if(ctx.user.status === 'active'){
      return true;
  } else{
      return new Error('Not Authenticated');
  }
 
})

   
  const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user.role === 'admin'
  })
   
  const isEditor = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user.role === 'editor'
  })
   
  // Permissions
  const permissions = shield({
    Query: {
      users: chain(isAuthenticated, isActive),
    }
  })

  module.exports = permissions