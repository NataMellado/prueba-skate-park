import express from 'express'
import { ping } from '../controllers/ping.controller.js';
import { methods as skateController } from '../controllers/skater.controller.js';
import { methods as authController } from '../controllers/authentication.controller.js';
import { methods as authMiddleware } from '../middlewares/authorization.js';
import { logoutController } from '../controllers/logout.controller.js';

const router = express.Router()

// Rutas del front
router.get('/ping', ping);
router.get('/', (req, res) => res.render('Home'));
router.get('/registro', authMiddleware.soloPublico , (req, res) => res.render('Registro'));
router.get('/login',  authMiddleware.soloPublico ,(req, res) => res.render('Login'));
router.get('/admin', (req, res) => res.render('Admin'));
router.get('/perfil',  authMiddleware.soloLogueado ,(req, res) => res.render('Perfil'));

// Rutas de la API
router.get('/api/getSkaters', skateController.getSkaters);
router.post('/api/login', authController.login);
router.post('/api/register', authController.register);
router.post('/api/logout', logoutController);
router.post('/api/getSkater', skateController.getSkater);
router.delete('/api/deleteSkater/:email', skateController.deleteSkater);
router.put('/api/updateSkater', skateController.updateSkater);

export default router