import { NowRequest, NowResponse } from '@now/node';
import { GraphEntry, Emotions } from '@voices-to-emotions/types';

import sendSuccess from '../../utils/send-success';
import sendError from '../../utils/send-error';
import setHeaders from '../../utils/set-headers';
import getModel from '../../../database/index';

function getPredictedEmotion(emotions: Emotions): string {
  let prediction_keys = ['angry', 'calm', 'disgust', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
  let predictions = [
    emotions.angry,
    emotions.calm,
    emotions.disgust,
    emotions.fearful,
    emotions.happy,
    emotions.neutral,
    emotions.sad,
    emotions.surprised
  ];

  let maxVal = Math.max.apply(null, predictions);
  return prediction_keys[predictions.indexOf(maxVal)];
}

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
        let predictedEmotion = getPredictedEmotion(emotions);

        return {
          angry: predictedEmotion === 'angry' ? acc.angry + 1 : acc.angry,
          calm: predictedEmotion === 'calm' ? acc.calm + 1 : acc.calm,
          disgust: predictedEmotion === 'disgust' ? acc.disgust + 1 : acc.disgust,
          fearful: predictedEmotion === 'fearful' ? acc.fearful + 1 : acc.fearful,
          happy: predictedEmotion === 'happy' ? acc.happy + 1 : acc.happy,
          neutral: predictedEmotion === 'neutral' ? acc.neutral + 1 : acc.neutral,
          sad: predictedEmotion === 'sad' ? acc.sad + 1 : acc.sad,
          surprised: predictedEmotion === 'surprised' ? acc.surprised + 1 : acc.surprised
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
      feedback: entry.feedback || Math.random(),
      duration: entry.timestamps[entry.timestamps.length - 1][1],
      created: entry.created
    });
  }

  sendSuccess(res, {
    data: graphData.reverse()
  });
}
