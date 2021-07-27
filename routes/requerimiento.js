
const {Router} = require('express');
const { getRequerimientos, editRequerimiento, newRequerimiento, deleteRequerimiento } = require('../controllers/requerimiento');
const validarToken = require('../middleware/validar-token');
const  router = Router();

router.get('/:id', validarToken, getRequerimientos);
router.put('/:id', validarToken, editRequerimiento);
router.post('/:id', validarToken, newRequerimiento);
router.delete('/:id', validarToken, deleteRequerimiento);




module.exports = router;    