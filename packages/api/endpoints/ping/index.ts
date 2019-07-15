import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import setHeaders from '../../utils/set-headers';
import mongoose from 'mongoose';
import getModel from '../../../database/index';
import { Mongoose } from 'mongoose';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  console.log('hi there');

  // @ts-ignore
  let user: mongoose.Model<mongoose.Document, {}> = getModel('user');

  user.find({}, '', function(err, data) {
    if (err) return err;
    // @ts-ignore
    console.log('%s.', data.name);

    let userList = data;
  });

  // Send response
  // @ts-ignore

  sendSuccess(res, userList);
}
