import { Response } from 'express';

export function success(res: Response, statusCode: number = 200, message: string = 'Sukses', data?: any) {
  return res.status(statusCode).json({
    status: true, message, data
  })
}

export function error(res: Response, statusCode: number = 500, message: string = 'An error occurred', errorData?: any) {
  res.status(statusCode).json({
    status: false,
    message,
    error: errorData,
  });
}