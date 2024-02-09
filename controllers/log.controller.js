const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosLog = async (req, res = response ) => {
    const { email, pass } = req.query;
    //const query = { estado: true};
    const usuario = await Usuario.findOne({correo: email, password: pass});
    
    if (usuario) {
        res.status(200).json({
            msg: 'Logeado exitosamente',
            usuario
        });    
    } else {
        res.status(410).json({
            msg: 'Credenciales Incorrectas'
        });
    }

    
}

module.exports = {
    usuariosLog
}