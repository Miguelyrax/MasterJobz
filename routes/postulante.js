
const {Router} = require('express');
const { getPostulantes, newPostulante, aceptarPostulante } = require('../controllers/postulante');
const validarToken = require('../middleware/validar-token');
const  router = Router();

router.get('/:id', validarToken, getPostulantes);
router.post('/:id', validarToken, newPostulante);
router.put('/:idJob/:idUser', validarToken, aceptarPostulante);




module.exports = router;     