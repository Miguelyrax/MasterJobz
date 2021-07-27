const {Router} = require('express');
const { getMensajes } = require('../controllers/mensajes');
const validarToken = require('../middleware/validar-token');
const router = Router();

router.get('/:de', validarToken, getMensajes);

module.exports = router;