import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { query } from '../../db/queries/queries.js';
import path from 'path';


// Controller para loguear a un usuario
async function login (req, res) {
    try {
        const { email, password } = req.body;
        const skaters = await query.getSkaters();
        
        // Buscar al usuario en la lista basándose en el email y la contraseña
        const user = skaters.find(skater => skater.email === email && skater.contraseña === password);

        if (!user) {
            console.log('Usuario o clave incorrecta');
            return res.status(401).json({ error: "Usuario o clave incorrecta" });
        }

         // Generar un token de autenticación
        const token = jwt.sign(
            { email }, 
            process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 60 *1000),
            path: '/',
            httpOnly: true
        }

        // Enviar una respuesta exitosa con el token 
        res.cookie('token', token, cookieOption);
        res.send({status: 'success', message: "Usuario logueado"})
        console.log(`Usuario ${email} logueado correctamente`);
        
    } catch (error) {
        console.error('Error en signIn:', error);
        res.status(500).json({ error: 'Error en el servidor: ' + error });
    }
}



// Controller para registrar a un usuario
async function register (req, res) {
    try {
        if (!req.files) {
            return res.status(400).json({ error: 'No se ha enviado ninguna imagen' });
        }


        // Foto
        const foto = req.files.foto;
        const fotoPath = path.join('public', 'upload', foto.name);
        await foto.mv(fotoPath);

        // Crear un nuevo usuario
        const datos = JSON.parse(req.body.datos);
        const { email, nombre, contraseña, anos_experiencia, especialidad } = datos
        const newUser = { email, nombre, contraseña, anos_experiencia, especialidad, foto:fotoPath, estado:false };
        const addUser = await query.addSkater(newUser);

        // Enviar una respuesta exitosa
        console.log('Usuario registrado correctamente:', email);
        return res.status(201).send({status:"ok",message:`Usuario  registrado`});
   
    } catch (error) {
        console.error('Error en signUp:', error);
        if (error.code === '23505') { // Error de violación de unicidad
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });

        } else if (error.code === '23502') { // Error de violación de restricción de no nulidad
            return res.status(400).json({ error: 'Uno o más campos obligatorios están vacíos.' });

        } else if (error.code === '22001') { // Error de tamaño máximo excedido
            return res.status(400).json({ error: `El campo supera el límite de caracteres permitidos.` });

        } else { // Otros errores
            return res.status(500).json({ error: 'Error en el servidor: ' + error});
        }
    }
}



export const methods = {
    login,
    register
}
