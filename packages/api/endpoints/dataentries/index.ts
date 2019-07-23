import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  let EntryModel = await getModel('dataEntry');
  let entries = await EntryModel.find({});

  sendSuccess(res, {
    data: entries
  });
}
