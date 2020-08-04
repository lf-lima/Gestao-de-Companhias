import { Request, Response } from 'express'
import loginService from '../../service/login'

class LoginController {
  public async auth (req: Request, res: Response) {
    try {
      const responseService = await loginService.auth(req.body)

      if (responseService.auth === false) {
        return res.status(400).json(responseService.errors)
      }

      return res.status(200).json(responseService.token)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error ' })
    }
  }
}

export default new LoginController()
