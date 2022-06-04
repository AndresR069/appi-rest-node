const express = require('express');
const Curso = require('../models/curso_model')
const ruta = express.Router();
//............LISTAR CURSOS ACTIVOS...........
ruta.get('/',(req, res) => {

    //res.json('Listo GET de cursos');
    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
});
//...........Ruta crear curso..................
ruta.post('/',(req,res)=>{
 let resultado = crearCurso(req.body);
 resultado.then(curso =>{
   res.json({
       curso
   })  
 }).catch(err=>{
     res.status(400).json(
         err
     )
 })
 
})
//...........PUT actualizar curso...........

ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
})
//......DELETE CURSO...(DESACTIVAR)..........

ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})

//...........LISTAR CURSOS ACTIVOS..........
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos;
}

//............AWAIT CREAR CURSO..............
async function crearCurso(body) {
    //crear usuario
    let curso = new Curso({
      titulo: body.titulo,
      descripcion: body.desc,
      password: body.password,
    });
    return await curso.save(); //retorna promesa por teoria
    //se maneja con un post para poder enviarlo
  }

  //...........AWAIT ACTUALIZAR CURSO.............
  async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.desc
        }
    }, {new: true});
    return curso;
}
//...............AWAIT DESACTIVAR CURSO..........
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return curso;
}

module.exports = ruta;