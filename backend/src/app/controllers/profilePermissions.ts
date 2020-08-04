import { Request, Response } from 'express'
import profilePermissionsService from '../../service/profilePermissions'

class ProfilePermissionsController {
  public restricted: Array<{ method: string, permissions: string[]}> = [
    {
      method: 'addPermission',
      permissions: [
        'addPermission'
      ]
    },
    {
      method: 'removePermission',
      permissions: [
        'addPermission'
      ]
    }
  ]

  public async addPermission (req: Request, res: Response) {
    try {
      const responseService = await profilePermissionsService.addPermission(Number(req.params.profileId), req.body.permissionId)

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async removePermission (req: Request, res: Response) {
    try {
      const responseService = await profilePermissionsService.removePermission(Number(req.params.profileId), Number(req.params.permissionId))

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(204).json({})
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}

export default new ProfilePermissionsController()
