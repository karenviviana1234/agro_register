import { Router } from "express";
import { Actualizarlote, Buscarlote,  Registrarlotes, desactivarlote, listarlotes } from "../controllers/lotes.controller.js";
import { validarlotes, validarlotesactualizar } from "../../validate/lotes.validacion.js";
//import { validarToken } from "../controllers/autenticacion.js";

const rutalote = Router();

rutalote.get("/listarlote", listarlotes);
rutalote.post("/Registrarlote",validarlotes, Registrarlotes);
rutalote.put("/Actualizarlote/:id_lote",validarlotesactualizar, Actualizarlote);
rutalote.get("/Buscarlote/:id_lote", Buscarlote);
rutalote.put("/desactivarlote/:id_lote", desactivarlote);


export default rutalote ;
