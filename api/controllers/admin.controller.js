import { query } from '../../db/queries/queries.js';



// Controller para obtener todos los administradores
async function getAdminsController (req, res) {
    try {
        const admins = await query.getAdmins();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default getAdminsController;