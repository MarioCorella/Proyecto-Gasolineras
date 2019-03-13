const db = require('../db');
let tokengn = require('tokengn');



let getByName = (nombre, done) => {
    db.get().query('select * from usuarios where nombre = ?', [nombre], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
        
    })
}

let insertToken = (token, id, done) => {
    db.get().query('UPDATE usuarios SET token=? WHERE id=?', [token, id], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
    })
}

module.exports = {
    getByName: getByName,
    insertToken: insertToken
}