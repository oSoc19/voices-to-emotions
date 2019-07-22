import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';

import backup from './backup.json';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  let EntryModel = await getModel('dataEntry');
  let userId = req.query['user_id'];

  if (!userId) {
    return sendError(res, {
      statusCode: 404,
      message: 'No user specified'
    });
  }

  let dataEntries = backup.filter(entry => entry.user_id === userId);
  await EntryModel.deleteMany({ user_id: req.query['user_id'] });
  await EntryModel.insertMany(dataEntries);

  sendSuccess(res, {
    data: {},
    message: 'Reset succesfully'
  });
}
