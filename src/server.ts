import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';
// &appName=database1
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    await seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`project-one app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();


// process.on('unhandledRejection', (err) => {
//   console.log(`unhandledRejection is detected,🤢shutting down...,${err}`);

//   if (server) {
//     console.log(server);

//     server.close(() => {
//       process.exit(1)
//     })
//   }
//   process.exit(1);
// })


// process.on('uncaughtException', () => {
//   console.log(`uncaughtException is detected,🤢shutting down...`);
//   process.exit(1)
// })

