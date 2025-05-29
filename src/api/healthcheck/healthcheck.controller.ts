import { Request, Response } from 'express';

import { asyncHandler } from '../../lib/async-handler';

// GET /api/v1/healthcheck - Returns server status
export const healthcheck = asyncHandler(async (req: Request, res: Response) => {
  const healthInfo = {
    status: 'available',
    uptime: process.uptime(),
    timeStamp: new Date(),
  };
  res.status(200).json({
    success: true,
    data: healthInfo,
  });
});
