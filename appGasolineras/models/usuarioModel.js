const db = require('../db');
let tokengn = require('tokengn')
var bcrypt = require('bcrypt');


// let comprobarReg = (email, done) => {
//     db.get().query('SELECT  usuarios.email FROM usuarios WHERE email =?', [email], (err, result) => {
//         if(err) return console.log(err.message)
//         done(null, result)
//     })
// }



let create = ({nombre, email, password}, done)=> {
   
    db.get().query('INSERT INTO usuarios (nombre, email, password) SELECT * FROM (SELECT ?,?,?) AS tmp WHERE NOT EXISTS (SELECT email FROM usuarios WHERE email = ?) LIMIT 1;',[nombre, email, password, email], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let edit = (token, done) => {
    db.get().query('SELECT * FROM usuarios WHERE token = ?', [token], (err, result) => {
        if (err) return console.log(err)
        done(null, result)
    })
}

let update = (id, nombre, email, done) => {
    db.get().query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',[nombre, email, id], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
    })
}

module.exports = {
   create: create,
   edit: edit,
   update: update,
//    comprobarReg: comprobarReg
}



