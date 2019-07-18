import { NowRequest, NowResponse } from '@now/node';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';
import { number } from 'prop-types';
import { likeliness } from '../../utils/likeliness';

export default async function(req: NowRequest, res: NowResponse) {
  // Set CORS Headers & content-type
  setHeaders(res);

  let UserModel = await getModel('user');
  let TeamModel = await getModel('team');
  let EntryModel = await getModel('dataEntry');

  if (req.query['user_id']) {
    let user = await UserModel.findById(req.query['user_id']);
    if (user) {
      let team = await TeamModel.findById(user.team);

      return sendSuccess(res, {
        data: {
          ...user._doc,
          team
        }
      });
    }

    return sendError(res, {
      statusCode: 404,
      message: 'User not found'
    });
  }

  let users = await UserModel.find({});

  let entries = await EntryModel.find({});

  let teams: { [key: string]: any } = {};
  for (let user of users) {
    teams[user.team] = true;
  }

  for (let id of Object.keys(teams)) {
    teams[id] = await TeamModel.findById(id);
  }

  let leavePercentages = likeliness(entries,users);

  sendSuccess(res, {
    data: users.map(user => {
      return {
        ...user._doc,
        leavePercentage: leavePercentages[user._id],
        team: teams[user.team]
      };
    })
  });
}
