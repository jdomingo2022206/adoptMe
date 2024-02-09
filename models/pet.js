const { Schema, model} = require('mongoose');

const PetSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },
    edad: {
        type: String,
        required: [true, 'La edad es obligatoria, puede ser aproximada']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    },
    desc: {
        type: String,
        required: [true, 'La descripcion es obligatoria(adopatdo, huerfano, lastimado, etc)']
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
});

/*PetSchema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.Object();
    return usuario;
}*/

module.exports = model('Pet', PetSchema);