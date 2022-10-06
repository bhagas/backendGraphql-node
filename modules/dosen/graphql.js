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
  input DosenInput {
    nama: String,
    gelar: String,
    alamat: String,
    jurusan: String
  }
  type Mutation {
    createDosen(input: DosenInput): Output
    updateDosen(id: ID!, input: DosenInput): Output
  }


  type Dosen {
     id: ID!,
     nama: String,
     gelar: String,
     alamat: String,
     jurusan: String
  }
  type Output{
    status:String,
    pesan:String
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
  Mutation:{
    createDosen: async (_, {input})=>{
        console.log(input);
        return {
            status: '200',
            pesan: 'Berhasil Simpan'
        }
    },
    updateDosen: async (_, {id, input})=>{
        console.log(id, input);
        return {
            status: '200',
            pesan: 'Berhasil Update'
        }
    }
  }
}
export const DosenModule = createModule({
  id: 'dosen-module',
  typeDefs: [typeDefs],
  resolvers: [resolvers]
});


