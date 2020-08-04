import { Request, Response } from 'express'
import employeeService from '../../service/employee'
import { InputEmployeeUserCreate, UserCreate, EmployeeCreate } from '../messages/employee/inputUserEmployeeCreate'
import { InputEmployeeUpdate } from '../messages/employee/inputEmployeeUpdate'
import User from '../../infra/models/user.model'
import Employee from '../../infra/models/employee.model'

class EmployeeController {
  public restricted: Array<{ method: string, permissions: string[]}> = [
    {
      method: 'createEmployeeUser',
      permissions: ['createEmployee::mine']
    },
    {
      method: 'update',
      permissions: ['createEmployee::mine']
    },
    {
      method: 'findAll',
      permissions: ['listEmployee::mine']
    },
    {
      method: 'findById',
      permissions: ['listEmployee::mine']
    },
    {
      method: 'deactivate',
      permissions: ['createEmployee::mine ']
    }
  ]

  public async createEmployeeUser (req: any, res: Response) {
    try {
      const inputEmployeeUserCreate = new InputEmployeeUserCreate({
        user: new UserCreate(req.body.user), employee: new EmployeeCreate({ ...req.body.employee, companyId: req.payload.companyId })
      })

      const errors = await inputEmployeeUserCreate.validate()

      if (inputEmployeeUserCreate.hasError) {
        return res.status(400).json(errors)
      }

      let responseService: {
        user: User,
        employee: Employee
      }

      const payloadPermissions = req.payload.permissions as { name: string }[]

      if (payloadPermissions.find(objPermission => objPermission.name === 'createEmployee::all')) {
        responseService = await employeeService.createEmployeeUser(
          req.body.user, req.body.employee
        )
      } else {
        responseService = await employeeService.createEmployeeUser(
          req.body.user, { ...req.body.employee, companyId: req.payload.companyId }
        )
      }

      const { user, employee } = responseService

      if (user.hasError || employee.hasError) {
        return res.status(400).json({ userErrors: await user.getErrors(), employeeErrors: await employee.getErrors() })
      }

      return res.status(200).json({ user, employee })
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async update (req: any, res: Response) {
    try {
      const inputEmployeeUpdate = new InputEmployeeUpdate({
        ...req.body, employeeId: Number(req.params.employeeId), companyId: req.payload.companyId
      })

      const errors = await inputEmployeeUpdate.validate()

      if (inputEmployeeUpdate.hasError) {
        return res.status(400).json(errors)
      }

      let responseService: Employee

      const payloadPermissions = req.payload.permissions as { name: string }[]

      if (payloadPermissions.find(objPermission => objPermission.name === 'createEmployee::all')) {
        responseService = await employeeService.update({
          ...req.body, employeeId: Number(req.params.employeeId)
        })
      } else {
        responseService = await employeeService.update({
          ...req.body, employeeId: Number(req.params.employeeId), companyId: req.payload.companyId
        })
      }

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error ' })
    }
  }

  public async findById (req: any, res: Response) {
    try {
      let responseService: Employee

      const payloadPermissions = req.payload.permissions as { name: string }[]

      if (payloadPermissions.find(objPermission => objPermission.name === 'listEmployee::all')) {
        responseService = await employeeService.findById(Number(req.params.findEmployeeId), req.body.companyId)
      } else {
        responseService = await employeeService.findById(Number(req.params.findEmployeeId), req.payload.companyId)
      }

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async findAll (req: any, res: Response) {
    try {
      let responseService: Employee[]

      const payloadPermissions = req.payload.permissions as { name: string }[]

      if (payloadPermissions.find(objPermission => objPermission.name === 'listEmployee::all')) {
        responseService = await employeeService.findAll(req.body.companyId)
      } else {
        responseService = await employeeService.findAll(Number(req.payload.companyId))
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async deactivate (req: any, res: Response) {
    try {
      let responseService: Employee

      const payloadPermissions = req.payload.permissions as { name: string }[]

      if (payloadPermissions.find(objPermission => objPermission.name === 'createEmployee::all')) {
        responseService = await employeeService.deactivate(Number(req.params.employeeId), req.body.companyId)
      } else {
        responseService = await employeeService.deactivate(Number(req.params.employeeId), req.payload.companyId)
      }

      if (responseService.hasError) {
        return res.status(500).json(await responseService.getErrors())
      }

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}

export default new EmployeeController()
