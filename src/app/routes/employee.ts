import BaseRouter from './base'
import employeeController from '../controllers/employee'
import authMiddleware from '../middlewares/authentication'
import permissionMiddleware from '../middlewares/permissions'

class EmployeeRouter extends BaseRouter {
  constructor () {
    super('/employee')

    this.router.post('/', authMiddleware.auth, employeeController.createEmployeeUser)
    this.router.put('/:employeeId', authMiddleware.auth, employeeController.update)
    this.router.get('/:findEmployeeId', authMiddleware.auth, employeeController.findById)
    this.router.get('/', authMiddleware.auth, permissionMiddleware.check('findAll', employeeController.restricted), employeeController.findAll)
    this.router.patch('/:employeeId', authMiddleware.auth, employeeController.deactivate)
  }
}

export default new EmployeeRouter()
