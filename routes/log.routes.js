const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosLog, usuariosLogB } = require('../controllers/log.controller');

const router = Router();

router.get("/", usuariosLog);

router.get("/cryp", usuariosLogB);

module.exports = router;