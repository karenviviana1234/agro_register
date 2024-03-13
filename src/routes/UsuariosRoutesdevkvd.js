import { Router } from "express"

import { actualizarUsuario , listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuarios} from "../controllers/usuarioscontrollerdevkvd.js";

import {validarUsuario, validarUsu} from '../../validate/UsuariosValidatedevkvd.js'
import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarusuario', validarToken,listarUsuarios);  
rutaUsuario.post('/registrarusuario',validarUsuario,registrarUsuarios);
rutaUsuario.post('/desactivarusuario/:id_usuario',validarToken, desactivarUsuario);
rutaUsuario.put('/actualizarusuario/:id_usuario',validarToken, validarUsu,actualizarUsuario);
rutaUsuario.get('/buscarusuario/:id_usuario',validarToken, buscarUsuario);


export default rutaUsuario;
