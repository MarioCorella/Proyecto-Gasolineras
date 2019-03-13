const mysql = require('mysql')

//el pool se encarga de establecer la conexion y de cerrarla
let pool = null

let connect = (done) => {
    pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password:'',
        port: 3306,
        database: 'gasolineras'
    })
    done()
}

let get = () => {
    return pool
}


module.exports = {
    connect: connect,
    get: get
}

