// path: localhost/8080/api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, reNewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');

const router = Router();

//Crear nuevos usuarios
router.post('/new',[
  check('nombre', 'nombre-required').not().notEmpty(),
  check('email', 'email-required').isEmail(),
  check('password', 'password-required').not().notEmpty(),
  validarCampos
], crearUsuario);

//Login
router.post('/',[
  check('email', 'email-required').isEmail(), 
  check('password', 'password-required').not().notEmpty(),
  validarCampos
], login);

//Revalidar token
router.get('/renew', validarJWT, reNewToken);

module.exports = router;