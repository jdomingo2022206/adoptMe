const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Pet = require('../models/pet');

const PetsGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, Pets] = await Promise.all([
        Pet.countDocuments(query),
        Pet.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        Pets
    });
} 

const getPetByid = async (req, res) => {
    const { id } = req.params;
    const Pet = await Pet.findOne({_id: id});

    res.status(200).json({
        Pet
    });
}

const PetsPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto} = req.body;

    await Pet.findByIdAndUpdate(id, resto);

    const Pet = await Pet.findOne({_id: id});

    res.status(200).json({
        msg: 'Pet Actualizado exitosamente',
        Pet
    })
}

const PetsDelete = async (req, res) => {
    const {id} = req.params;
    await Pet.findByIdAndUpdate(id,{estado: false});

    const Pet = await Pet.findOne({_id: id});

    res.status(200).json({
        msg: 'Pet eliminado exitosamente',
        Pet
    });
}

const PetsPost = async (req, res) =>{
    const { nombre, tipo, edad } = req.body;
    const Pet = new Pet({nombre, tipo, edad});

    await Pet.save();
    res.status(200).json({
        Pet
    });
}

module.exports = {
    PetsDelete,
    PetsPost,
    PetsGet,
    getPetByid,
    PetsPut
}