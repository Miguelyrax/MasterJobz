

const {Router} = require('express');
const { getJobs, getJob, editJob, newJob, deleteJob } = require('../controllers/job');
const validarToken = require('../middleware/validar-token');
const  router = Router();

router.get('/', validarToken, getJobs);
router.get('/:id', validarToken, getJob);
router.put('/:id', validarToken, editJob);
router.post('/', validarToken, newJob);
router.delete('/:id', validarToken, deleteJob);



module.exports = router;    