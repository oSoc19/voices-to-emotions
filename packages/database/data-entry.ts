import { Mongoose } from 'mongoose';

export default function(mongoose: Mongoose) {
  const Schema = mongoose.Schema;
  // @ts-ignore
  const ObjectId = Schema.ObjectId;

  let schema = new Schema({
    user_id: ObjectId,
    created: Date,
    feedback: Number,
    timestamps: [[Number, Number]],
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
    ]
  });

  return mongoose.model('DataEntry', schema);
}
