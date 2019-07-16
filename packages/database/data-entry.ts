import { Mongoose } from 'mongoose';

export default function(mongoose: Mongoose) {
  const Schema = mongoose.Schema;
  // @ts-ignore
  const ObjectId = Schema.ObjectId;

  let schema = new Schema({
    user_id: ObjectId,
    emotions: [
      {
        angry: Number,
        calm: Number,
        disgust: Number,
        fearful: Number,
        happy: Number,
        neutral: Number,
        sad: Number,
        surprised: Number
      }
    ],
    timestamps: [[Number, Number]]
  });

  return mongoose.model('DataEntry', schema);
}
