import Company from '../infra/models/company'
import Employee from '../infra/models/employee'

declare global {
  namespace Express {
      export interface Request {
          company: Company,
          employee: Employee
      }
  }
}
