import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import setHeaders from '../../utils/set-headers';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  // Send response
  sendSuccess(res, { data: 'Pong', message: 'Pong' });
}
