import { Mongoose } from 'mongoose';

export default function(mongoose: Mongoose) {
  const Schema = mongoose.Schema;
  // @ts-ignore
  const ObjectId = Schema.ObjectId;

  let schema = new Schema({
    id: ObjectId,
    test: String
  });

  return mongoose.model('Product', schema);
}
