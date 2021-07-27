const {Router} = require('express');
const { getProfile, newProfile, editProfile } = require('../controllers/profile');
const validarToken = require('../middleware/validar-token');
const router = Router();

router.get('/', validarToken, getProfile);
router.post('/', validarToken, newProfile);
router.put('/', validarToken, editProfile);

module.exports = router;