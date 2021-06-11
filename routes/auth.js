const {Router} = require('express');
const { login, renewJWT } = require('../controllers/auth');
const validarToken = require('../middleware/validar-token');
const  router = Router();

router.post('/',[
    
],login);

router.get('/renew',[
    validarToken,
],renewJWT);

module.exports = router;    