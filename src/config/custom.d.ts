import Company from '../infra/models/employee'

declare global {
  namespace Express {
      export interface Request {
          company: Company;
      }
  }
}
