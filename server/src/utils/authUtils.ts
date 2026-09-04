import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'flood-safe-lk-secure-secret-key-2026-sri-lanka';

export const hashPassword = (password: string): { salt: string; hash: string } => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

export const verifyPassword = (password: string, salt: string, expectedHash: string): boolean => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === expectedHash;
};

export interface TokenPayload {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 7 days
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const decoded = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null; // expired
    }

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name
    };
  } catch (err) {
    return null;
  }
};
