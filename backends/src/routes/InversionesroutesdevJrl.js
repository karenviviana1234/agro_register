import { Router } from "express";
import { Validateinversiones, actualizar} from "../../validate/InversioesdevJrl.js";
import { BuscarInversiones, actualizarInversiones, listarInversiones, registrarInversiones} from "../controllers/InvesionescontrollerdevJrl.js";
//import { validarToken } from "../controllers/autenticacion.js";

const inversiones = Router()


inversiones.get('/listarInversion',listarInversiones)
inversiones.post('/RegistrarInversion',Validateinversiones, registrarInversiones)
inversiones.get('/BuscarInversion/:id_Inversiones',BuscarInversiones)
inversiones.put('/ActualizarInversion/:id_Inversiones',actualizar, actualizarInversiones)


export default inversiones

