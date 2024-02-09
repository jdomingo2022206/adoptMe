const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Pet = require('../models/pet');

const PetsGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, pets] = await Promise.all([
        Pet.countDocuments(query),
        Pet.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        pets
    });
} 

const getPetByid = async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        pet
    });
}

const PetsPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto} = req.body;

    await Pet.findByIdAndUpdate(id, resto);

    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        msg: 'Pet Actualizado exitosamente',
        pet
    })
}

const PetsDelete = async (req, res) => {
    const {id} = req.params;
    await Pet.findByIdAndUpdate(id,{estado: false});

    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        msg: 'Pet eliminado exitosamente',
        pet
    });
}

const PetsPost = async (req, res) =>{
    const { nombre, tipo, edad, sexo, desc } = req.body;
    const pet = new Pet({nombre, tipo, edad, sexo, desc});

    await pet.save();
    res.status(200).json({
        pet
    });
}

module.exports = {
    PetsDelete,
    PetsPost,
    PetsGet,
    getPetByid,
    PetsPut
}