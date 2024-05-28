import mongoose from 'mongoose';

export async function connectToMongoDB() {
  const dbName = process.env.DB_NAME;

  const Uri = process.env.DB_URI;

  try {
    if (Uri) {
      await mongoose.connect(Uri, {
        dbName,
      });
    }
    console.log(`✅ Connected to Database (MongoDB) -> Database Name : ${dbName}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to Database (MongoDB)');
  });

  mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('❌ Disconnected from Database (MongoDB)');
  });
}
