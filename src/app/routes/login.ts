import { Router } from 'express'
import loginController from '../controllers/login'

const router = Router()

router.get('/', loginController.authenticate)

export default router
