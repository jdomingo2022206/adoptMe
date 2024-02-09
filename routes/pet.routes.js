const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existePetById} = require('../helpers/db-validators');

const { PetsPost, PetsGet, getPetByid, PetsPut, PetsDelete } = require('../controllers/pet.controller');

const router = Router();

router.get("/", PetsGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ], getPetByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ], PetsPut);

router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existePetById),
            validarCampos
        ], PetsDelete);

        
router.post(
    "/", 
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("tipo","El tipo es obligatorio").not().isEmpty(),
        check("edad","La edad es obligatoria").not().isEmpty(),
        validarCampos,
    ], PetsPost); 

module.exports = router;