const {Router, response} = require('express');
const { check } = require('express-validator');
const router = Router();
const {getUsuarios, newUsuario, editUsuario, deleteUsuario} = require('../controllers/usuarios');
const {customRol, emailExist, validarId} = require('../custom/customRol');
const validarCampos = require('../middleware/validar-campos');
const validarRoles = require('../middleware/validar-roles');
const validarToken = require('../middleware/validar-token');
const Role = require('../models/role');

router.get('/',getUsuarios);
router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('email').custom(emailExist),
    check('password','El nombre es requerido').not().isEmpty(),
    check('role').custom(customRol),
    validarCampos,
    
    
],newUsuario);
router.put('/:id',[
    check('id','Id no es valido').isMongoId(),
    check('id').custom(validarId),
    check('role').custom(customRol),
    validarToken,
    validarCampos
],editUsuario);
router.delete('/:id',[
    validarToken,
    validarRoles('ADMIN-ROLE','USER-ROLE'),
    check('id','Id no es valido').isMongoId(),
    check('id').custom(validarId),
    validarCampos
],deleteUsuario);

module.exports = router;