const {Router} = require('express');
const { check } = require('express-validator');
const { login, renewJWT, register } = require('../controllers/auth');
const { emailExist, customRol } = require('../custom/customRol');
const validarCampos = require('../middleware/validar-campos');
const validarToken = require('../middleware/validar-token');
const  router = Router();



router.post('/',[
    
],login);

router.post('/register',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('email').custom(emailExist),
    check('password','El nombre es requerido').not().isEmpty(),
    check('role').custom(customRol), 
    validarCampos, 
],register);

router.get('/renew',[
    validarToken,
],renewJWT);

module.exports = router;    