var express = require('express');
var router = express.Router();
let tokengn = require('tokengn')
const loginModel = require('../../models/loginModel');
var bcrypt = require('bcrypt');


/* http://localhost:3000/api/login/access*/
router.post('/access', (req, res) => {
  loginModel.getByName(req.body.nombre, (err, result) => {
    if (err) return console.log(err.message)
    //console.log(req.body.password)
    console.log(result)
    if (result.length == 1) {
      let comparacionClaves = bcrypt.compareSync(req.body.password, result[0].password)
      if (comparacionClaves == true) {
        let token = tokengn()
        loginModel.insertToken(token, result[0].id, (err, result) => {
          if (err) return console.log(err.message)
          console.log(result)
          res.json({
            token: token
          })
        })
      } else {
        res.json({
          error: 'Usuario y/o contraseña incorrecto'
        })
      }
    }
  })
})


module.exports = router;
