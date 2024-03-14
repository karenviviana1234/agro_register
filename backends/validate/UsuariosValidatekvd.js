import { check } from "express-validator";

export const validarUsuario = [
    check('nombre', 'El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres')
        .not()
        .isEmpty()
        .isLength({ max: 50 })
        .matches(/^[A-Za-z\s]+$/),

    check('apellido', 'El apellido es obligatorios y debe contener solo letras, máximo 50 caracteres')
        .not()
        .isEmpty()
        .isLength({ max: 50 })
        .matches(/^[A-Za-z\s]+$/),

    check('rol', 'Rol no existe')
        .not()
        .isEmpty()
        .isIn(["administrador", "empleado"]),
        check('estado', 'Estado no existe')
        .not().isEmpty()
        .isIn(["activo", "inactivo"]),
];

    

    export const validarUsu = [
        check('nombre', 'El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres')
        .optional()
            .not().isEmpty()
            .isLength({ max: 50 })
            .matches(/^[A-Za-z\s]+$/),
    
            check('apellido', 'El apellido es obligatorio y debe contener solo letras, máximo 50 caracteres')
            .optional()
            .not().isEmpty()
            .isLength({ max: 50 })
            .matches(/^[A-Za-z\s]+$/),
    
        check('rol', 'Rol no existe')
            .optional()
            .not().isEmpty()
            .isIn(["administrador", "empleado"]),
         check('estado', 'Estado no existe')
            .optional()
            .not().isEmpty()
            .isIn(["activo", "inactivo"]),
    ];
    //nn