const {Router} = require('express');
const { login } = require('../controllers/auth');
const validarToken = require('../middleware/validar-token');
const  router = Router();

router.get('/',[
    
],login);

module.exports = router;    