import { Router } from 'express'
import userController from '../controllers/user'
import authMiddleware from '../middlewares/authentication'

const router = Router()

router.get('/', authMiddleware, userController.findAll)
router.get('/:userId', authMiddleware, userController.findById)
router.post('/', userController.store)
router.put('/', authMiddleware, userController.update)
router.delete('/', authMiddleware, userController.delete)

export default router
