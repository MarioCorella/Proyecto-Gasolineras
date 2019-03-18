const db = require('../db');




let getByIdProv = (idProv, municipio, done) => {
    db.get().query('SELECT * FROM gas_station WHERE idprovincia = ? AND municipio = ?', [idProv, municipio], (err, result) => {
        if (err) return console.log(err.message)
        done(null, result)
    })
}

let getProvincias = (done) => {
    db.get().query('SELECT DISTINCT(provincia) FROM gas_station', (err, result) => {
        if (err) return console.log(err.message)
        done(null, result)
    })
}

let getMunicipios = (provincia, done) => {
    db.get().query('SELECT DISTINCT(municipio) FROM gas_station WHERE provincia = ?', [provincia], (err, result) => {
        if (err) console.log(err.message)
        done(null, result)
    })
}

let getGasolineras = (provincia, municipio, done) => {
    db.get().query('SELECT * FROM gas_station WHERE provincia = ? AND municipio = ?', [provincia, municipio], (err, result) => {
        if (err) console.log(err.message)
        done(err, result)
    })
}

let getRanking = (tipo) => {
    return new Promise((resolve, reject) => {
        db.get().query(`SELECT * FROM gas_station  WHERE ${tipo} IS NOT NULL ORDER BY ${tipo} ASC LIMIT 5`, (err, result) => {
            if (err) return reject(err.message)
            resolve(result)
        })
    })
}

let getFiltrosUsers = (tipo) => {
    return new Promise((resolve, reject) => {
        db.get().query(`SELECT * FROM gas_station  WHERE ${tipo} IS NOT NULL ORDER BY ${tipo} ASC `, (err, result) => {
            if (err) return reject(err.message)
            resolve(result)
        })
    })
}


let addGasFavorite = (ideess, token, done) => {
    db.get().query('INSERT INTO `usuarios-gasolineras`(`id`, `fk-usuario`, `fk-gasolinera`) VALUES (null,(SELECT usuarios.id FROM usuarios WHERE token=?),?)',[token, ideess], (err, result) => {
        if(err) return console.log(err)
        done(null, result)
    })
}

let getFavoritos = (token, done) => {
    db.get().query('SELECT DISTINCT(ug.fkgasolinera), gs.* FROM usuarios-gasolineras ug, gas_station gs WHERE ug.fkgasolinera = gs.id AND fkusuario = (SELECT usuarios.id FROM usuarios WHERE token= ?)',[token], (err, result) => {
        if(err) return console.log(err)
        done(null, result)
    })
}



module.exports = {
    getByIdProv: getByIdProv,
    getProvincias: getProvincias,
    getMunicipios: getMunicipios,
    getGasolineras: getGasolineras,
    getRanking: getRanking,
    getFiltrosUsers: getFiltrosUsers,
    addGasFavorite: addGasFavorite,
    getFavoritos: getFavoritos
}