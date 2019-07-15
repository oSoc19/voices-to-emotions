import { Mongoose } from 'mongoose';

export default function (mongoose: Mongoose) {
  const Schema = mongoose.Schema;
  // @ts-ignore
  const ObjectId = Schema.ObjectId;

  let schema = new Schema({
    id: ObjectId,
    first_name: String,
    last_name: String,
    gender: String,
    dob: Date,
    start_date: Date,
    team: String,
    happy: [Number],
    sad: [Number],
    fearful: [Number],
    angry: [Number],
    call_duration: [Number]
  });

  return mongoose.model('User', schema);
}
