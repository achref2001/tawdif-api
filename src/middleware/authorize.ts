// src/middleware/authorize.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserRole } from '../types/UserRole';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

// Updated authorize middleware
export const authorize = (roles: UserRole[]): RequestHandler => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
    } else {
      next(); // Pass control to the next middleware if authorized
    }
  };
};
