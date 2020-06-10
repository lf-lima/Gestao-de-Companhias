import { Router } from 'express'
// import das rotas
import userRoutes from './user'
import loginRoutes from './login'

const router = Router()

// RAIZ
router.get('/', async (req, res) => {
  return res.send('<h1> Hellow Sun </h1>')
})

const usersUrl = '/users'
const loginUrl = '/login'

router.use(usersUrl, userRoutes)
router.use(loginUrl, loginRoutes)

export default router
