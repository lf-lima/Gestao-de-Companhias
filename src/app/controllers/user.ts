import { Request, Response } from 'express'
import userService from '../../service/user'

class UserController {
  public async store (req: Request, res: Response) {
    try {
      const responseService = await userService.store(req.body)

      if (responseService.hasError) {
        return res.status(400).json(responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const responseService = await userService.update(req.user, req.body)

      if (responseService.hasError) {
        return res.status(400).json(responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }

  public async findAll (req: Request, res: Response) {
    try {
      const responseService = await userService.findAll()
      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }

  public async findById (req: Request, res: Response) {
    try {
      const responseService = await userService.findById(Number(req.params.userId))

      if (responseService.hasError) {
        return res.status(400).json(responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const responseService = await userService.delete(req.user)

      if (responseService.hasError) {
        return res.status(400).json(responseService.getErrors())
      }

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error' })
    }
  }
}

export default new UserController()
