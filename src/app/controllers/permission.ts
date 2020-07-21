import { Request, Response } from 'express'
import { InputPermissionCreate } from '../messages/permission/inputPermissionCreate'
import permissionService from '../../service/permission'
import { InputPermissionUpdate } from '../messages/permission/inputPermissionUpdate'

class PermissionController {
  public restricted: Array<{ method: string, permissions: string[]}> = [
    {
      method: 'create',
      permissions: [
        'createPermission'
      ]
    },
    {
      method: 'update',
      permissions: [
        'createPermission'
      ]
    },
    {
      method: 'findAll',
      permissions: [
        'listPermission'
      ]
    },
    {
      method: 'findById',
      permissions: [
        'listPermission'
      ]
    },
    {
      method: 'delete',
      permissions: [
        'createPermission'
      ]
    }
  ]

  public async create (req: Request, res: Response) {
    try {
      const inputPermissionCreate = new InputPermissionCreate(req.body)

      const errors = await inputPermissionCreate.validate()

      if (inputPermissionCreate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await permissionService.create(req.body)

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const inputPermissionUpdate = new InputPermissionUpdate({ ...req.body, permissionId: Number(req.params.permissionId) })

      const errors = await inputPermissionUpdate.validate()

      if (inputPermissionUpdate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await permissionService.update(Number(req.params.permissionId), req.body)

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async findAll (req: Request, res: Response) {
    try {
      const responseService = await permissionService.findAll()
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async findById (req: Request, res: Response) {
    try {
      const responseService = await permissionService.findById(Number(req.params.findPermissionId))

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const responseService = await permissionService.delete(Number(req.params.permissionId))

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(204).json({})
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}

export default new PermissionController()
