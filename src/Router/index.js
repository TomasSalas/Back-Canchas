import express from "express";
import { getArriendos } from "../Controllers/GetArriendos.js";
import { InsertUsuario } from "../Controllers/InsertUsuario.js";
import { LoginUsuario } from "../Controllers/Login.js";
import { Authorization } from "../../helpers/Authorization.js";
import { UpdateTipoPago } from "../Controllers/UpdateTipoPago.js";
import { getUsuarios } from "../Controllers/GetUsuarios.js";
import { InsertArriendo } from "../Controllers/InsertReserva.js";

const routes = express();

routes.post("/iniciar-sesion", LoginUsuario);
routes.get("/", Authorization, getArriendos);
routes.get("/usuarios", Authorization, getUsuarios);
routes.post("/crear-usuario", Authorization, InsertUsuario);
routes.post("/crear-arriendo", Authorization, InsertArriendo);
routes.put("/update-pago", Authorization, UpdateTipoPago);

export default routes;
