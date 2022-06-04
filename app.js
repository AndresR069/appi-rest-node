const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos')
const auth = require('./routes/auth')
const config = require('config');
//------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
//...................................................
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/cursos',cursos)
app.use('/api/usuarios',usuarios)
app.use('/api/auth',auth)

//.CONEXION  BASE DE DATOS.......................

//Conectarnos a la BD
mongoose.connect(config.get('configDB.HOST'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));

//.......Configuracion del puerto y conexion...........................................
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(port)
    console.log('Api RESTful ok, y ejecutandose...')
})

