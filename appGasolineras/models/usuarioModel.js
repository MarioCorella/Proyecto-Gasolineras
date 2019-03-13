const db = require('../db');
let tokengn = require('tokengn')
var bcrypt = require('bcrypt');


let create = ({nombre, email, password}, done)=> {
   
    db.get().query('insert into usuarios(nombre, email, password) values ( ?, ?, ? )',[nombre, email, password], (err, result) => {
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

module.exports = {
   create: create,
   edit: edit
}



