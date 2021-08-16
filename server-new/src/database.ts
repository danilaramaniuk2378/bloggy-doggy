import mongoose, { Connection } from 'mongoose';

export function connectDatabase(): Promise<Connection> {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', (error) => reject(error))
      .on('close', () => console.log('Database connection is closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect('mongodb://localhost/rent-flat-2-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
}
