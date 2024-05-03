import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { query } from '../../db/queries/queries.js';

// Middleware para verificar si el skater está logueado
async function soloSkater(req, res, next) {
    try {
        const logueado = await revisarCookie(req);
        const logueadoAdmin = await revisarCookieAdmin(req);
        
        if (logueado) {
            return next();
        } else if (logueadoAdmin) {
            return res.redirect('/admin');
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.redirect('/login');
    }
}

/// Middleware para verificar si el administrador está logueado
async function soloAdmin(req, res, next) {
    try {
        const logueado = await revisarCookie(req);
        const logueadoAdmin = await revisarCookieAdmin(req);

        if (logueadoAdmin) {
            return next();
        } else if (logueado) {
            return res.redirect('/perfil');
        } else {
            return res.redirect('/loginAdmin');
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.redirect('/loginAdmin');
    }
}


// Middleware para verificar si no hay un usuario logueado
function soloPublico(req, res, next) {
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect('/perfil');
}

// Función para obtener los skaters por email
function obtenerSkaterPorEmail(email) {
    return query.getSkaters()
        .then(skaters => skaters.find(skater => skater.email === email))
        .catch(error => {
            console.error('Error al obtener los skaters:', error);
            return null; 
        });
}

// Función para obtener los administradores por email
function obtenerAdminPorEmail(email) {
    return query.getAdmins()
        .then(admins => admins.find(admin => admin.email === email))
        .catch(error => {
            console.error('Error al obtener los administradores:', error);
            return null; 
        });
}

// Función para revisar el token del skater
function revisarCookie(req) {
    const token = req.cookies.token;
    if (!token) return false;

    try {
        const verificarToken = jwt.verify(token, process.env.JWT_SECRET);
        return obtenerSkaterPorEmail(verificarToken.email)
            .then(user => {
                if (!user) return false;
                console.log('Token verificado correctamente');
                return verificarToken;
            })
            .catch(error => {
                console.error('Error al verificar el token:', error);
                return false;
            });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return false;
    }
};

// Función para revisar el token del administrador
function revisarCookieAdmin(req) {
    const token = req.cookies.token;
    if (!token) return false;

    try {
        const verificarToken = jwt.verify(token, process.env.JWT_SECRET);
        return obtenerAdminPorEmail(verificarToken.email)
            .then(user => {
                if (!user) return false;
                console.log('Token verificado correctamente');
                return verificarToken;
            })
            .catch(error => {
                console.error('Error al verificar el token:', error);
                return false;
            });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return false;
    }
};


export const methods = {
    soloSkater,
    soloPublico,
    soloAdmin
}