import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';
import { likeliness } from '../../utils/likeliness';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  if (!req.query['user_id']) {
    return sendError(res, {
      message: 'Invalid request'
    });
  }

  let Model = await getModel('dataEntry');
  let dataEntries = await Model.find({
    user_id: req.query['user_id']
  });
  let UserModel = await getModel('user');
  let user = await UserModel.findById(req.query['user_id']);

  let leavePercentage = likeliness(dataEntries, user);

  sendSuccess(res, {
    data: leavePercentage
  });
}
