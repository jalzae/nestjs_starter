import { Response } from 'express';
import { encrypt } from '../middleware/encrypt'
const env = process.env.NODE_ENV
export function success(res: Response, statusCode: number = 200, message: string = 'Sukses', data?: any) {
  const response = {
    status: true,
    message,

  }
  if (data) {
    response['data'] = encrypt(data)
  }

  if (env === 'development') {
    response['preview'] = data
  }
  return res.status(statusCode).json(response)
}

export function error(res: Response, statusCode: number = 500, message: string = 'An error occurred', errorData?: any) {
  res.status(statusCode).json({
    status: false,
    message,
    error: errorData,
  });
}