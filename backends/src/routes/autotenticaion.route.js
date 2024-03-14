import { Router } from "express";
import { validar } from "../controllers/autenticacion.js";

const rutaValidacion = Router()

rutaValidacion.post('/validacion', validar)

export default rutaValidacion
<<<<<<< HEAD
//crud
=======
//nn
>>>>>>> devkvd
