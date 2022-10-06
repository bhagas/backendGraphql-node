import db from '../../config/koneksi.js'
import { createModule, gql } from 'graphql-modules';
const typeDefs=
  gql`
  "Query untuk mahasiswa"
   type Query {
    """
    Deskripsi untuk mahasiswa
    berisi tentang profil mahasiswa
    """
      mahasiswas: [Mahasiswa]
      "Query untuk mahasiswa by id"
      mahasiswa(id: ID!): Mahasiswa
  }
  type Mahasiswa {
     id: ID!,
     nama: String,
     umur: Int,
     alamat: String,
     dosen: Dosen,
     dosen_id: Int
  }
`

const resolvers= {
  Query: {
    mahasiswas: async () => {
          let dt = await db.query('select * from mahasiswa');
          //bisa array return nya
          return dt[0];
      },
      mahasiswa: async (obj, args, context, info) =>
          {
              let dt = await db.query(`select * from mahasiswa where id= '${args.id}'`);
              //harus object return nya
              return dt[0][0];
          },
  },

  Mahasiswa: {
    dosen: async (obj, args, context, info) =>{
        let dt = await db.query(`select * from Dosens where id= '${obj.dosen_id}'`);
        //harus object return nya
        return dt[0][0];
    }
        // db.users.findByPk(obj.user_id),
  }
}

export const MahasiswaModule = createModule({
    id: 'mahasiswa-module',
    typeDefs: [typeDefs],
    resolvers: [resolvers]
  });