import { Router } from 'express'
import postController from '../controllers/post'
import authMiddleware from '../middlewares/authentication'

const router = Router()

router.post('/', authMiddleware, postController.store)

export default router
