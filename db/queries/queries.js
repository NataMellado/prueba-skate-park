import pool from '../../db/config.js';

// Consulta para obtener la fecha actual de la base de datos
const ping = async () => {
    try {
        const query = 'SELECT NOW()';
        const response = await pool.query(query);
        return response.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Consulta para obtener todos los skaters
const getSkaters = async () => {
    try {
        const query = { text: 'SELECT * FROM skaters' };
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Consulta para obtener un skater por email
const getSkater = async (email) => {
    try {
        const query = {
            text: 'SELECT * FROM skaters WHERE email = $1',
            values: [email]
        };
        const response = await pool.query(query);
        return response.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// Consulta para añadir un nuevo skater
const addSkater = async (newUser) => {
    try {
        const query = {
            text: 'INSERT INTO skaters (email, nombre, contraseña, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: [newUser.email, newUser.nombre, newUser.contraseña, newUser.anos_experiencia, newUser.especialidad, newUser.foto, newUser.estado]
        };
        const response = await pool.query(query);
        return response.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Consulta para eliminar un skater
const deleteSkater = async (email) => {
    try {
        const query = {
            text: 'DELETE FROM skaters WHERE email = $1',
            values: [email]
        };
        const response = await pool.query(query);
        return response.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Consulta para actualizar un skater
const updateSkater = async (email, updatedUser) => {
    try {
        const query = {
            text: 'UPDATE skaters SET nombre = $1, contraseña = $2, anos_experiencia = $3, especialidad = $4 WHERE email = $5',
            values: [updatedUser.nombre, updatedUser.contraseña, updatedUser.anos_experiencia, updatedUser.especialidad, email]
        };
        const response = await pool.query(query);
        return response.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// Consulta para actualizar el estado de un skater
const changeStatus = async (id, estado) => {
    try {
        const query = {
            text: 'UPDATE skaters SET estado = $1 WHERE id = $2',
            values: [estado, id]
        };
        const response = await pool.query(query);
        return response.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Consulta para obtener todos los administradores
const getAdmins = async () => {
    try {
        const query = { text: 'SELECT * FROM administradores' };
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const query = { 
    ping,
    getSkaters,
    addSkater,
    deleteSkater,
    updateSkater,
    getSkater,
    getAdmins,
    changeStatus
};


