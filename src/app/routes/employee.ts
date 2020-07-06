import BaseRouter from './base'
import employeeController from '../controllers/employee'
import authMiddleware from '../middlewares/authentication'

class EmployeeRouter extends BaseRouter {
  constructor () {
    super('/employee')

    this.router.post('/', authMiddleware.auth, employeeController.createEmployeeUser)
    this.router.put('/:employeeId', authMiddleware.auth, employeeController.update)
    this.router.get('/:employeeId', authMiddleware.auth, employeeController.findById)
    this.router.patch('/:employeeId', authMiddleware.auth, employeeController.deactivate)
  }
}

export default new EmployeeRouter()
