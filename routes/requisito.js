
const {Router} = require('express');
const { getRequisitos, editRequisito, newRequisito, deleteRequisito } = require('../controllers/requisito');
const validarToken = require('../middleware/validar-token');
const  router = Router();

router.get('/:id', validarToken, getRequisitos);
router.put('/:id', validarToken, editRequisito);
router.post('/:id', validarToken, newRequisito);
router.delete('/:id', validarToken, deleteRequisito);




module.exports = router;    