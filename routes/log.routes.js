const { Router } = require('express');
const { usuariosLog } = require('../controllers/log.controller');

const router = Router();

router.get("/", usuariosLog);

module.exports = router;