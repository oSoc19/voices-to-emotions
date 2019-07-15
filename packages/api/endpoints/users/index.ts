import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  let Model = await getModel('user');
  let users = await Model.find({});
  console.log(users);

  sendSuccess(res, { data: users });
}
