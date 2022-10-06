import db from '../../config/koneksi.js'
import { createModule, gql } from 'graphql-modules';
const typeDefs=
  gql`
  "Query untuk dosen"
   type Query {
    """
    Deskripsi untuk dosen
    berisi tentang profil dosen
    """
      dosens: [Dosen]
      "Query untuk dosen by id"
      dosen(id: ID!, nama: String): Dosen
  }
  type Dosen {
     id: ID!,
     nama: String,
     gelar: String,
     alamat: String,
     jurusan: String
  }
`

const resolvers= {
  Query: {
      dosens: async () => {
          let dt = await db.query('select * from Dosens');
          //bisa array return nya
          return dt[0];
      },
      dosen: async (obj, args, context, info) =>
          {
              console.log(args);
              let dt = await db.query(`select * from Dosens where id= '${args.id}'`);
              //harus object return nya
              return dt[0][0];
          },
  },

  // Dosen: {
  //   user: async (obj, args, context, info) =>
  //       db.users.findByPk(obj.user_id),
  // }
}
export const DosenModule = createModule({
  id: 'dosen-module',
  typeDefs: [typeDefs],
  resolvers: [resolvers]
});


