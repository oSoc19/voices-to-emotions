import { NowResponse } from '@now/node';

export type DataPackage = {
  message: string;
  data?: any;
  statusCode?: number;
};

export default function sendError(res: NowResponse, { data, message, statusCode }: DataPackage) {
  res.statusCode = statusCode || 500;
  res.end(JSON.stringify({ type: 'error', data, message }));
}
