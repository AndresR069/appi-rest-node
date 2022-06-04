const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
//const ruta = require('../routes/usuarios');
const Usuario = require('../models/usuario_model')
const ruta = express.Router();

//.......FUNCION MIDELWARE........................................................

ruta.post('/',(req,res)=>{

   Usuario.findOne({email: req.body.email})
   .then(datos => {
       if(datos){
           const passWordValido = bcrypt.compareSync(req.body.password, datos.password);
           if(!passWordValido) return res.status(400).json({error:'ok', msj:'Usuario o contraseña incorrecta'})
          res.json(datos);
       }else{
           res.status(400).json({
               error:'ok',
               msj:'Usuario o contraseña incorrecta.'
           })
       }
   })
   .catch(err =>{
       res.status(400).json({
           error:'ok',
           msj:'Error en el servicio'
       })
   })
})


module.exports = ruta;