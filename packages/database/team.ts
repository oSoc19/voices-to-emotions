import { Mongoose } from 'mongoose';

export default function(mongoose: Mongoose) {
  const Schema = mongoose.Schema;

  let schema = new Schema({
    name: String
  });

  return mongoose.model('Team', schema);
}
