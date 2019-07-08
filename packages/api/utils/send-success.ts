import { NowResponse } from '@now/node';

export type DataPackage = {
  data: string;
  message: string;
};

export default function sendSuccess(res: NowResponse, { data, message }: DataPackage) {
  res.statusCode = 200;
  res.end(JSON.stringify({ type: 'success', data, message }));
}
