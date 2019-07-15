import { Mongoose } from 'mongoose';

export default function(mongoose: Mongoose) {
  const Schema = mongoose.Schema;
  // @ts-ignore
  const ObjectId = Schema.ObjectId;

  let schema = new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    birth_date: Date,
    start_date: Date,
    team: ObjectId
  });

  return mongoose.model('User', schema);
}
