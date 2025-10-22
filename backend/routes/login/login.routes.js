const controladorLogin = require('../../controller/login/login.controller.js');

const router = require('express').Router();

router.post('/login', controladorLogin.login);
router.post('/register', controladorLogin.register);

module.exports = router;