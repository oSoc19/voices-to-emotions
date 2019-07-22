import { NowRequest, NowResponse } from '@now/node';
import { GraphEntry, Emotions } from '@voices-to-emotions/types';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';

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
  })
    .sort({
      created: -1
    })
    .limit(10);

  let graphData: Array<GraphEntry> = [];
  for (let entry of dataEntries) {
    let avgEmotions = entry.emotions.reduce(
      (acc: Emotions, emotions: Emotions) => {
        return {
          angry: acc.angry + emotions.angry,
          calm: acc.calm + emotions.calm,
          disgust: acc.disgust + emotions.disgust,
          fearful: acc.fearful + emotions.fearful,
          happy: acc.happy + emotions.happy,
          neutral: acc.neutral + emotions.neutral,
          sad: acc.sad + emotions.sad,
          surprised: acc.surprised + emotions.surprised
        };
      },
      {
        angry: 0,
        calm: 0,
        disgust: 0,
        fearful: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprised: 0
      }
    );

    graphData.push({
      angry: avgEmotions.angry / entry.emotions.length,
      calm: avgEmotions.calm / entry.emotions.length,
      disgust: avgEmotions.disgust / entry.emotions.length,
      fearful: avgEmotions.fearful / entry.emotions.length,
      happy: avgEmotions.happy / entry.emotions.length,
      neutral: avgEmotions.neutral / entry.emotions.length,
      sad: avgEmotions.sad / entry.emotions.length,
      surprised: avgEmotions.surprised / entry.emotions.length,
      feedback: entry.feedback,
      duration: entry.timestamps[entry.timestamps.length - 1][1]
    });
  }

  sendSuccess(res, {
    data: graphData.reverse()
  });
}
