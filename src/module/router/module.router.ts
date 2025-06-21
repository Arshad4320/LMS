import { Router } from 'express'
import { moduleController } from '../controller/module.controller'

const router = Router()

router.post('/create-module', moduleController.createModule)
router.get('/:courseId', moduleController.getAllModuleByCourse)

router.patch('/update-module/:id', moduleController.updateModule)
router.delete('/delete-module/:id', moduleController.deleteModule)

export default router
