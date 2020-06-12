import { Request, Response, NextFunction } from 'express'
import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'
import userRepository from '../../repository/user'
import User from '../../infra/models/user'

interface TokenPayload {
  id: number
  username: string
  email: string
}

export default async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
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

    const payload = jwt.verify(token, authConfig.secret) as TokenPayload
    const user = await userRepository.findById(payload.id, { returnPassword: false }) || new User()

    if (user.isEmpty()) {
      return res.status(400).json({ error: 'User not exists' })
    }

    const paramUserId = Number(req.params.userId)
    if (paramUserId) {
      if (paramUserId !== user.id) {
        return res.status(400).json({ error: 'Not authorized' })
      }
    }

    req.user = user

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, redo your login' })
  }
}
