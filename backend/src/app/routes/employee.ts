import BaseRouter from './base'
import employeeController from '../controllers/employee'
import authMiddleware from '../middlewares/authentication'
import permissionMiddleware from '../middlewares/permissions'

class EmployeeRouter extends BaseRouter {
  constructor () {
    super('/employee')

    this.router.post('/', authMiddleware.auth,
      permissionMiddleware.check('createEmployeeUser', employeeController.restricted), employeeController.createEmployeeUser)
    this.router.put('/:employeeId', authMiddleware.auth,
      permissionMiddleware.check('update', employeeController.restricted), employeeController.update)
    this.router.get('/:findEmployeeId', authMiddleware.auth,
      permissionMiddleware.check('findById', employeeController.restricted), employeeController.findById)
    this.router.get('/', authMiddleware.auth,
      permissionMiddleware.check('findAll', employeeController.restricted), employeeController.findAll)
    this.router.patch('/:employeeId', authMiddleware.auth,
      permissionMiddleware.check('deactivate', employeeController.restricted), employeeController.deactivate)
  }
}

export default new EmployeeRouter()
