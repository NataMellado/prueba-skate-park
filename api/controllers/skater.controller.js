import { query } from '../../db/queries/queries.js';



// Controller para obtener todos los skaters
async function getSkaters (req, res) {
    try {
        const skaters = await query.getSkaters();
        res.status(200).json(skaters);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



// Controller para eliminar un skater
async function deleteSkater (req, res) {
    const email = req.params.email;
    try {
        const skater = await query.deleteSkater(email);
        console.log('Usuario eliminado correctamente:', email);
        res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        res.status(500).send(error.message);
    }
}



// Controler para obtener skater por email
async function getSkater (req, res) {
    const email = req.body.email;
    try {
        const skater = await query.getSkater(email);
        if (!skater) {
            return res.status(404).send('Usuario no encontrado');
        } else {
            res.status(200).json(skater);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}



// Controler para actualizar un skater
async function updateSkater (req, res) {
    const email = req.body.email;
    const updatedUser = req.body.user;
    try {
        const skater = await query.updateSkater(email, updatedUser);
        console.log('Usuario actualizado correctamente:', email);
        res.status(200).send('Usuario actualizado correctamente');
    } catch (error) {
        res.status(500).send(error.message);
    }
}




export const methods = {
    getSkaters,
    deleteSkater,
    getSkater,
    updateSkater

}
