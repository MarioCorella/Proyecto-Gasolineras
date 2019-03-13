var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');


const usuarioModel = require('../../models/usuarioModel');

/* http://localhost:3000/api/usuarios/access */

router.post('/access', (req, res) => {
  usuarioModel.comprobarReg( req.body.email, (err, result) => {
    if(err) return console.log(err.message)
    res.json(result)
  })
})



/* http://localhost:3000/api/usuarios/create */
router.post('/create', (req, res) => {
  // console.log(req.body)
  let claveEncriptada = bcrypt.hashSync(req.body.password, 10)
  req.body.password = claveEncriptada
  usuarioModel.create(req.body, (err, rows) => {
    if(err) return console.log(err.message)  
    res.json(rows) 
  })
})

/* http://localhost:3000/api/usuarios/edit */
router.post('/edit', (req, res) => {
  console.log(req.body)
   usuarioModel.edit(req.body.token, (err, result) => {
     if (err) return console.log(err.message)
     console.log(result)
     res.json(result[0])
   })
})

/*"http://localhost:3000/api/usuarios/update"*/
router.post('/update', (req, res) => {
  usuarioModel.update(req.body.id, req.body.nombre, req.body.email, (err, result) => {
    if(err) return console.log(err.message)
    console.log(result)
      res.json(result)
  })
})

module.exports = router;


