import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import corsHeaders from '../../utils/cors-headers';

module.exports = async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  corsHeaders(res);
  res.setHeader('Content-Type', 'application/json');

  // Send response
  sendSuccess(res, { data: 'Pong', message: 'Pong' });
};
