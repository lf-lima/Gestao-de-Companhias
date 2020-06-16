import { Request, Response } from 'express'
import loginService from '../../service/login'

class LoginController {
  public async company (req: Request, res: Response) {
    try {
      const responseService = await loginService.company(req.body)

      if (!responseService.auth) {
        return res.status(400).json(responseService.errors)
      }

      return res.status(200).json({ token: responseService.token })
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error ' })
    }
  }
}

export default new LoginController()
