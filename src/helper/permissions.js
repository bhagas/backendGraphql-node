const { not,and, or, rule, shield } = require("graphql-shield");


const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    if(ctx.user !== null){
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
      users: isAuthenticated,
    }
  })

  module.exports = permissions