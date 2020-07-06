import { Request, Response } from 'express'
import employeeService from '../../service/employee'
import { InputEmployeeUserCreate } from '../messages/employee/inputUserEmployeeCreate'
import { InputEmployeeUpdate } from '../messages/employee/inputEmployeeUpdate'

class EmployeeController {
  public async createEmployeeUser (req: any, res: Response) {
    try {
      const inputEmployeeUserCreate = new InputEmployeeUserCreate({
        user: req.body.user, employee: { ...req.body.employee, companyId: req.payload.companyId }
      })

      const errors = inputEmployeeUserCreate.validate()

      if (inputEmployeeUserCreate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await employeeService.createEmployeeUser(
        req.body.user, { ...req.body.employee, companyId: req.payload.companyId }
      )

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

      const responseService = await employeeService.update({
        ...req.body, employeeId: Number(req.params.employeeId), companyId: req.payload.companyId
      })

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
      const responseService = await employeeService.findById(Number(req.params.employeeId), req.payload.companyId)

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async deactivate (req: any, res: Response) {
    try {
      const responseService = await employeeService.deactivate(Number(req.params.employeeId), req.payload.companyId)

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
