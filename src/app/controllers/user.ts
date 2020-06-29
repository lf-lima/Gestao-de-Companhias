import { Request, Response } from 'express'
import userService from '../../service/user'
import { InputUserUpdate } from '../messages/user/inputUserUpdate'

class UserController {
  public async update (req: Request, res: Response) {
    try {
      const inputUserUpdate = new InputUserUpdate(req.body)

      const errors = await inputUserUpdate.validate()

      if (inputUserUpdate.hasError) {
        return res.status(400).json(errors)
      }

      const responseService = await userService.update({ ...req.body, userId: Number(req.params.userId) })

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async findById (req: Request, res: Response) {
    try {
      const responseService = await userService.findById(Number(req.params.findUserId), { returnPassword: false })

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
      const responseService = await userService.findAll()

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const responseService = await userService.delete(Number(req.params.userId))

      if (responseService.hasError) {
        return res.status(400).json(await responseService.getErrors())
      }

      return res.status(204).json({})
    } catch (error) {
      return res.status(500).json({ error: 'Server internal error' })
    }
  }
}

export default new UserController()
