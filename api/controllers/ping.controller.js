import { query } from '../../db/queries/queries.js';

// Controller para obtener la fecha actual de la base de datos
export const ping = async (req, res) => {
    try {
        const response = await query.ping();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
};


