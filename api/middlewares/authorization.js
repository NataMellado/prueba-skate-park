import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { query } from '../../db/queries/queries.js';

// Middleware para verificar si el usuario está logueado
function soloLogueado(req, res, next) {
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect('/');
}

// Middleware para verificar si el usuario no está logueado
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

// Función para revisar la cookie del token
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


export const methods = {
    soloLogueado,
    soloPublico
}