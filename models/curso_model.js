const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema({
  //aqui cremaos modelo de datos segun la api mongoose
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  imagen: {
    type: String,
    required: false
  },
  alumnos:{
      type:Number,
      default:0
  },
  calificacion:{
      type:Number,
      default:0
  }
});

module.exports = mongoose.model('Curso', CursoSchema);
