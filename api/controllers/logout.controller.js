// Controller para cerrar la sesión del usuario
export const logout = (req, res) => {
    try {
      // Eliminar la cookie de token en la respuesta
      res.clearCookie('token', { path: '/' });
      res.send({ status: 'success', message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
      res.status(500).json({ error: 'Error interno del servidor al cerrar sesión' });
    }
  };

