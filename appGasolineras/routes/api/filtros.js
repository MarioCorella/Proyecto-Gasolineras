var express = require('express');
var router = express.Router();

const gasModel = require('../../models/GasModel');

/*http://localhost:3000/api/filtros/provincias */
router.get('/provincias', (req, res)=>{
    gasModel.getProvincias((err, rows) => {
        res.json(rows)
    })
})

/* http://localhost:3000/api/filtros/municipios */
router.post('/municipios', (req, res) => {
  gasModel.getMunicipios(req.body.provincia, (err, rows) => {
    if(err) return console.log(err.message)
     res.json(rows)   
  })
})

/*http://localhost:3000/api/filtros */
router.post('/', (req, res) => {
  //console.log(req.body)
  gasModel.getGasolineras(req.body.provincia, req.body.municipio, (err, rows) => {
    if(err) return console.log(err.message)
    res.json(rows)
  })
})

/* http://localhost:3000/api/filtros/ranking */
router.get('/ranking', async (req, res) => {
  let tipos = [
    'precio_biodiesel',
    'precio_bioetanol',
    'precio_gas_natural_comprimido',
    'precio_gas_natural_licuado',
    'precio_gases_licuados_petroleo',
    'precio_gasoleo_a',
    'precio_gasoleo_b',
    'precio_gasolina_95_proteccion',
    'precio_gasolina_98',
    'precio_nuevo_gasoleo_a'
  ]
  let resultado = {}
  for(let i = 0; i<tipos.length; i++){
    let rows = await gasModel.getRanking(tipos[i])
    resultado[tipos[i]] = rows
  }
  res.json(resultado)
})

/* http://localhost:3000/api/filtros/users */ 
router.post('/users', async (req, res) => {
  let tipos = [
    'precio_biodiesel',
    'precio_bioetanol',
    'precio_gas_natural_comprimido',
    'precio_gas_natural_licuado',
    'precio_gases_licuados_petroleo',
    'precio_gasoleo_a',
    'precio_gasoleo_b',
    'precio_gasolina_95_proteccion',
    'precio_gasolina_98',
    'precio_nuevo_gasoleo_a'
  ]
  let resultado = {}
  for(let i = 0; i<tipos.length; i++){
    let rows = await gasModel.getFiltrosUsers(tipos[i])
    resultado[tipos[i]] = rows
  }
  res.json(resultado)
})

/* http://localhost:3000/api/filtros/favoritos/ */
router.post('/favoritos', (req, res) => {
  console.log(req.body)
   gasModel.addGasFavorite(req.body.id, req.body.token, (err, rows) =>{
    if(err) return console.log(err.message)
   console.log(rows)
  })
})

/* http://localhost:3000/api/filtros/deleteFav */ 
router.post('/deleteFav', (req, res) => {
  gasModel.deleteFav(req.body.id, req.body.token, (err, result) => {
    if(err) return console.log(err.message)
   res.json(result)
  })
})

/* http://localhost:3000/api/filtros/listaFav */
router.post('/listaFav', (req, res) => {
  gasModel.getFavoritos(req.body.token, (err, rows) => {
    if(err) return console.log(err.message)
    res.json(rows)
  })
})


module.exports = router;
