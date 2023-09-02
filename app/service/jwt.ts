import * as jwt from 'jsonwebtoken';

const secretKey = process.env.jwt_key

interface JwtPayload {
  userId: string;
  roleId: string;
}

export function getToken(payload: JwtPayload, expiresIn: string = '1d'): string {
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function isJwtExpired(token: string): any {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return { status: true, data: decodedToken };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { status: false, message: 'Expired' };
    }
    return { status: false, message: 'Malformed' };
  }
}
