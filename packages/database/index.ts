import mongoose from 'mongoose';

import User from './user';

// @ts-ignore
mongoose.connect(process.env.MONGODB_CONN_STRING, { useNewUrlParser: true });

let connected = false;
let models: { [key: string]: any } = {};
async function connect() {
  if (connected) return;

  let db = mongoose.connection;
  await new Promise((resolve, reject) => {
    db.once('error', (e: Error) => reject(e));
    db.once('open', () => resolve());
  });

  models = {
    user: User(mongoose)
  };

  connected = true;
}

export default async function getModel(name: string) {
  await connect();

  return models[name];
}
