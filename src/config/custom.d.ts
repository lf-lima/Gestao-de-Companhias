import User from '../infra/models/user'

declare global {
  namespace Express {
      export interface Request {
          user: User;
      }
  }
}
