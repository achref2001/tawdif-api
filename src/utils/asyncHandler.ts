import { Request, Response, NextFunction } from 'express';

// Wraps async route handlers and forwards errors to the Express error handler
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) =>
        fn(req, res, next).catch(next);
