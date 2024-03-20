import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

//crud listar
//listar
export const listarA = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM actividad")

        if (result.length > 0 ) {
            res.status(200).json(result)
        } else {
            res.status(400).json({
                "Mensaje":"No hay actividades que listar"
            })
        }
    } catch (error) {
        res.status(500).json({
            "Mensaje": "error en el sistema"
        })
    }
}
export const RegistrarA = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { nombre_actividad, tiempo, observaciones, fk_id_variedad, valor_actividad, estado } = req.body;

        // Si no se proporciona un valor para 'rol', establecerlo como 'activo'
        const esta = estado || 'activo';

         // fk variedad 
         const [variedadExist] = await pool.query('SELECT * FROM variedad WHERE id_variedad = ?', [fk_id_variedad]);

         if (variedadExist.length === 0) {
             return res.status(404).json({
                 status: 404,
                 message: 'la variedad no existe. Registre primero una variedad.'
             });
         }
        
        
        const [result] = await pool.query("INSERT INTO actividad (nombre_actividad, tiempo, observaciones, fk_id_variedad, valor_actividad, estado) VALUES (?, ?, ?, ?, ?, ?)", [nombre_actividad, tiempo, observaciones, fk_id_variedad, valor_actividad, estado]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se registró la actividad con éxito',
                result: result // Mostrar el objeto result completo
            });
        
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se registró la actividad',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'error en el sistema'
        });
    }
}

export const ActualizarA = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { nombre_actividad, tiempo, observaciones, fk_id_variedad, valor_actividad  } = req.body;
        if (!nombre_actividad && !tiempo && !observaciones && !fk_id_variedad && !valor_actividad) {
            return res.status(400).json({ message: 'Al menos uno de los campos (nombre_actividad, tiempo, observaciones, fk_id_variedad, valor_actividad) debe estar presente en la solicitud para realizar la actualización.' });
        }
        // Realiza una consulta para obtener la variedad de cultivo antes de actualizarla
        const [oldActividad] = await pool.query("SELECT * FROM actividad WHERE id_actividad=?", [id]);

        if (oldActividad.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Actividad no encontrada',
            });
        }

        // Realiza la actualización en la base de datos
        const [result] = await pool.query(
            `UPDATE actividad
            SET nombre_actividad = ${nombre_actividad ? `'${nombre_actividad}'` : `'${oldActividad[0].nombre_actividad}'`}, 
            tiempo = ${tiempo !== undefined ? `'${tiempo}'` : 'tiempo'},
            observaciones = ${observaciones ? `'${observaciones}'` : `'${oldActividad[0].observaciones}'`},
            fk_id_variedad = ${fk_id_variedad ? `'${fk_id_variedad}'` : `'${oldActividad[0].fk_id_variedad}'`},
            valor_actividad = ${valor_actividad ? `'${valor_actividad}'` : `'${oldActividad[0].valor_actividad}'`}
            WHERE id_actividad = ?`,
            [id]
        );
     
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Actividad actualizada con éxito',
            });
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se pudo actualizar la Actividad ',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Error en el sistema'
        });
    }
};

//CRUD - Desactivar
export const DesactivarA = async (req, res) => {
     try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { estado } = req.body;

        // Verificar si el campo estado está presente en el cuerpo de la solicitud
        if (!estado) {
            // Si el campo estado está en blanco o no está presente, enviar una respuesta con estado 400 (Bad Request) y un mensaje indicando que deben llenar el campo estado
            return res.status(400).json({
                status: 400,
                message: 'Por favor, especifique el estado para desactivar o activar la actividad'
            });
        }

        // Buscar la actividad por su ID
        const [oldActividad] = await pool.query("SELECT * FROM actividad WHERE id_actividad = ?", [id]);

        // Verificar si se encontró la actividad
        if (oldActividad.length > 0) {
            // Actualizar el estado de la actividad
            const [result] = await pool.query(
                `UPDATE actividad SET estado = ? WHERE id_actividad = ?`, [estado, id]
            );

            // Verificar si se afectaron filas en la base de datos
            if (result.affectedRows > 0) {
                // Si se actualizó correctamente, enviar una respuesta con estado 200
                res.status(200).json({
                    status: 200,
                    message: 'Peticion con éxito',
                    result: result
                });
            } else {
                // Si no se encontró el registro para desactivar, enviar una respuesta con estado 404
                res.status(404).json({
                    status: 404,
                    message: 'No se encontró el registro para su peticion'
                });
            }
        } 
    } catch (error) {
        // Si hay algún error en el proceso, enviar una respuesta con estado 500
        res.status(500).json({
            status: 500,
            message: 'Error en el sistema: ' + error
        });
    }
}



// CRUD - Buscar
export const BuscarA = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("SELECT * FROM actividad WHERE id_actividad=?", [id]);
                    
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
            message: "error en el sistema"
        });
    }
}



