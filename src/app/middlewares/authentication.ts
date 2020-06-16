import { Request, Response, NextFunction } from 'express'
import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'
import companyRepository from '../../repository/company'
import Company from '../../infra/models/company'

interface TokenPayload {
  id: number
}

class Authentication {
  async company (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
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
      const company = await companyRepository.findById(payload.id) || new Company()

      if (company.isEmpty()) {
        return res.status(400).json({ error: 'Company not exists, redo your login' })
      }

      if (req.params.companyId) {
        if (company.id !== Number(req.params.companyId)) {
          return res.status(401).json({ error: 'Not authorized' })
        }
      }

      req.company = company

      return next()
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, redo your login' })
    }
  }
}

export default new Authentication()
