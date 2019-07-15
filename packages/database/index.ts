import mongoose, { Model } from 'mongoose';

import User from './user';
import Team from './team';
import DataEntry from './data-entry';

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
    user: User(mongoose),
    team: Team(mongoose),
    dataEntry: DataEntry(mongoose)
  };

  connected = true;
}

export default async function getModel(name: string): Promise<Model<any>> {
  await connect();

  return models[name];
}
