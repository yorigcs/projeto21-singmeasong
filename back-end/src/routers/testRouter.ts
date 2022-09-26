import { Router } from 'express'
import { resetDbController } from '../controllers/testController'

const resetDb = Router()

resetDb.get('/reset-db', resetDbController)

export default resetDb
