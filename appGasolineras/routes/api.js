var express = require('express');
var router = express.Router();
const usuariosRouter = require('./api/usuarios');
const loginRouter = require('./api/login');
const filtrosRouter = require('./api/filtros');

/* http://localhost:3000/api */
router.get('/', function(req, res) {
    res.send('/API funciona');
  });

  router.use('/usuarios', usuariosRouter);
  router.use('/login', loginRouter);
  router.use('/filtros', filtrosRouter);
   

module.exports = router;