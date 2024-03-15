import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

//CRUD - registrar una variedad
export const registrarVariedad = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        const { nombre_variedad, tipo_cultivo } = req.body;

        const [result] = await pool.query("INSERT INTO variedad (nombre_variedad, tipo_cultivo) VALUES (?, ?)", [nombre_variedad, tipo_cultivo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se registró con éxito',
                result: result // Mostrar el objeto result completo
            });
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se registró',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Error en el sistema'
        });
    }
};

// CRUD - Listar
export const listarVariedades = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM variedad");

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(400).json({
                message: 'No hay ninguna variedad registrada'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el sistema"
        });
    }
};

// CRUD - Actualizar
export const actualizarVariedad = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { nombre_variedad, tipo_cultivo } = req.body;

        // Realiza una consulta para obtener la variedad antes de actualizarla
        const [oldVariedad] = await pool.query("SELECT * FROM variedad WHERE id_variedad=?", [id]);

        if (oldVariedad.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Variedad no encontrada',
            });
        }

        // Realiza la actualización en la base de datos
        const [result] = await pool.query(
            `UPDATE variedad 
            SET nombre_variedad = ${nombre_variedad ? `'${nombre_variedad}'` : `'${oldVariedad[0].nombre_variedad}'`}, 
            tipo_cultivo = ${tipo_cultivo ? `'${tipo_cultivo}'` : `'${oldVariedad[0].tipo_cultivo}'`} 
            WHERE id_variedad = ?`,
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se actualizó con éxito',
            });
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se encontró el registro para actualizar',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Error en el sistema'
        });
    }
};


// CRUD - Buscar
export const buscarVariedad = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("SELECT * FROM variedad WHERE id_variedad=?", [id]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron resultados para la búsqueda'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el sistema"
        });
    }
};