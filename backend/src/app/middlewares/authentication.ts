import { Request, Response, NextFunction } from 'express'
import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'
import userService from '../../service/user'

class AuthenticationMiddleware {
  async auth (req: any, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' })
      }

      const parts = authHeader?.split(' ') as string[]

      if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token error' })
      }

      const [scheme, token] = parts

      if (scheme !== 'Bearer') {
        return res.status(401).json({ error: 'Token malformatted' })
      }

      const tokenParts = token.split('.') as string[]

      if (tokenParts.length !== 3) {
        return res.status(401).json({ error: 'Token malformatted' })
      }

      const payload = jwt.verify(token, authConfig.secret) as {
        userId: number,
        userEmail: string,
        companyId: number,
        permissions: {
          id: number;
          name: string;
          description: string;
      }[] }

      const user = await userService.findById(payload.userId)

      if (user.isEmpty()) {
        return res.status(400).json({ error: 'User not exists, redo your login' })
      }

      req.payload = payload

      return next()
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, redo your login' })
    }
  }
}

export default new AuthenticationMiddleware()
