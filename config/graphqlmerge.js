import { createApplication } from 'graphql-modules';

import {DosenModule} from'../modules/dosen/graphql.js';
import {MahasiswaModule} from'../modules/mahasiswa/graphql.js';

// import * as mahasiswa from'./modules/mahasiswa/controller.js';
export let application = createApplication({
    modules: [DosenModule,MahasiswaModule],
  });