import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';
import fs from 'fs';
const { join } = require('path');

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  let EntryModel = await getModel('dataEntry');

  if (!req.query['user_id']) {
    return sendError(res, {
      statusCode: 404,
      message: 'No user specified'
    });
  }

  //let backup = await EntryModel.find({"user_id":req.query['user_id']});

  let dataEntries;

  fs.readFile(join(__dirname, 'backups\\\\' + req.query['user_id'] + '.json'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    dataEntries = JSON.parse(data);
  });

  await EntryModel.deleteMany({ user_id: req.query['user_id'] });

  await EntryModel.insertMany(dataEntries);

  sendSuccess(res, {
    data: ''
  });
}
