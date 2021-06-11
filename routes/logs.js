const {Router} = require('express');

const validarRoles = require('../middleware/validar-roles');
const validarToken = require('../middleware/validar-token');
const { check } = require('express-validator');
const validarCampos = require('../middleware/validar-campos');
const { getLogs, newLog, editLog, deleteLog } = require('../controllers/logs');
const router = Router();

router.get('/',[
    validarToken,
    validarRoles('ADMIN-ROLE','USER-ROLE'),
    validarCampos,
],getLogs)
router.post('/new',[
    validarToken,
    validarRoles('ADMIN-ROLE','USER-ROLE'),
    validarCampos,
],newLog)
router.put('/edit/:id',[
    validarToken,
    validarRoles('ADMIN-ROLE'),
    validarCampos,
],editLog)
router.delete('/delete/:id',[
    validarToken,
    validarRoles('ADMIN-ROLE'),
    validarCampos,
],deleteLog)


module.exports = router;