import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  let UserModel = await getModel('user');
  let TeamModel = await getModel('team');

  if (req.query['user_id']) {
    let user = await UserModel.findById(req.query['user_id']);
    if (user) {
      user.team = await TeamModel.findById(user.team);

      return sendSuccess(res, {
        data: user
      });
    }

    return sendError(res, {
      statusCode: 404,
      message: 'User not found'
    });
  }

  let users = await UserModel.find({});

  let teams: { [key: string]: any } = {};
  for (let user of users) {
    teams[user.team] = true;
  }

  for (let id of Object.keys(teams)) {
    teams[id] = await TeamModel.findById(id);
  }

  sendSuccess(res, {
    data: users.map(user => {
      return {
        ...user._doc,
        team: teams[user.team]
      };
    })
  });
}
