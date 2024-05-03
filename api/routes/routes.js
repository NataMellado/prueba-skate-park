import express from 'express'
import { ping } from '../controllers/ping.controller.js';
import { methods as skateController } from '../controllers/skater.controller.js';
import { methods as authController } from '../controllers/authentication.controller.js';
import { methods as authMiddleware } from '../middlewares/authorization.js';
import { logoutController } from '../controllers/logout.controller.js';
import getAdminsController from '../controllers/admin.controller.js';

const router = express.Router()

// Rutas para renderizar las vistas
router.get('/ping', ping);
router.get('/', (req, res) => res.render('Home'));
router.get('/participantes', (req, res) => res.render('Participantes'));
router.get('/registro', authMiddleware.soloPublico , (req, res) => res.render('Registro'));
router.get('/login',  authMiddleware.soloPublico ,(req, res) => res.render('Login'));
router.get('/perfil',  authMiddleware.soloSkater ,(req, res) => res.render('Perfil'));
router.get('/loginAdmin', authMiddleware.soloPublico, (req, res) => res.render('LoginAdmin'));
router.get('/admin', authMiddleware.soloAdmin, (req, res) => res.render('Admin'));


// Rutas de la API
router.get('/api/getSkaters', skateController.getSkaters);
router.get('/api/getAdmins', getAdminsController);
router.post('/api/getSkater', skateController.getSkater);
router.delete('/api/deleteSkater/:email', skateController.deleteSkater);
router.put('/api/updateSkater', skateController.updateSkater);
router.put('/api/skaterStatus', skateController.skaterStatus);
router.post('/api/login', authController.login);
router.post('/api/loginAdmin', authController.loginAdmin);
router.post('/api/register', authController.register);
router.post('/api/logout', logoutController);

// Ruta para manejar errores 404
router.get('*', (req, res) => {res.status(404).render('404');});

export default router