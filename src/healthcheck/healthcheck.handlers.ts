import { Request, Response } from 'express';

export async function healthcheck(req: Request, res: Response) {
  const healthInfo = {
    status: 'available',
    uptime: process.uptime(),
    timeStamp: new Date(),
  };
  res.status(200).json(healthInfo);
}
