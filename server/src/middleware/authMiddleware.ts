import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/authUtils';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access denied. Please login to perform this operation.'
    });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please login again.'
    });
    return;
  }

  req.user = decoded;
  next();
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access restricted. Administrator privileges are required for this action.'
    });
    return;
  }
  next();
};
