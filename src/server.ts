import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

// &appName=database1

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`project-one app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
