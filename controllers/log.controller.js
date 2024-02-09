const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosLog = async (req, res = response ) => {
    const { email, pass } = req.query;
    //const { email, passB} = req.body;
    const usuario = await Usuario.findOne({correo: email, password: pass});
    //const usuarioB = await Usuario.findOne({correo: emailB, password: passB});
    
    if (usuario) {
        res.status(200).json({
            msg: 'Logeado exitosamente',
            usuario
        });    
    } else {
        res.status(410).json({
            msg: 'Credenciales Incorrectas usuarios Log'
        });
    }

    
}

const usuariosLogB = async (req, res = response ) => {
    //const { email, pass } = req.query;
    const emailB = req.body.correo;
    const  passB = req.body.password;
    //const usuario = await Usuario.findOne({correo: email, password: pass});
    const usuarioB = await Usuario.findOne({correo: emailB, password: passB});
    
    if (usuarioB) {
        res.status(200).json({
            msg: 'Logeado exitosamente',
            usuarioB
        });    
    } else {
        res.status(410).json({
            msg1 : `Error: ` +emailB+` `+passB,
            msg: 'Credenciales Incorrectas usuarios LogB'
        });
    }

    
}

module.exports = {
    usuariosLog,
    usuariosLogB
}