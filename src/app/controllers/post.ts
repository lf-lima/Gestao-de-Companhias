import { Request, Response } from 'express'
import postService from '../../service/post'

class PostController {
  public async store (req: Request, res: Response) {
    try {
      const responseService = await postService.store(req.user.id, req.body)

      if (responseService.hasError) {
        return res.status(400).json(responseService.getErrors())
      }

      return res.status(200).json(responseService)
    } catch (error) {
      return res.status(500).json({ error: 'Server Internal Error! ' })
    }
  }
}

export default new PostController()
