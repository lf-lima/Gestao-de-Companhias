import { Request, Response } from 'express'
import { InputProfileCreate } from '../messages/profile/inputProfileCreate'
import { InputProfileUpdate } from '../messages/profile/inputProfileUpdate'
import profileService from '../../service/profile'

class ProfileController {
  public restricted: Array<{ method: string, permissions: string[]}> = [
    {
      method: 'create',
      permissions: [
        'createProfile'
      ]
    },
    {
      method: 'update',
      permissions: [
        'createProfile'
      ]
    },
    {
      method: 'findAll',
      permissions: [
        'listProfile'
      ]
    },
    {
      method: 'findById',
      permissions: [
        'listProfile'
      ]
    },
    {
      method: 'delete',
      permissions: [
        'createProfile'
      ]
    }
  ]

  public async create (req: Request, res: Response) {
    try {
      const inputProfileCreate = new InputProfileCreate(req.body)

      const errors = await inputProfileCreate.validate()

      if (inputProfileCreate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await profileService.create(req.body)

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
      const inputProfileUpdate = new InputProfileUpdate({ ...req.body, profileId: Number(req.params.profileId) })

      const errors = await inputProfileUpdate.validate()

      if (inputProfileUpdate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await profileService.update(Number(req.params.profileId), req.body)

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
      const responseService = await profileService.findAll()

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async findById (req: Request, res: Response) {
    try {
      const responseService = await profileService.findById(Number(req.params.findProfileId))

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
      const responseService = await profileService.delete(Number(req.params.profileId))

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(204).json({})
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}

export default new ProfileController()
