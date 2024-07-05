import { CrearToken } from "../../helpers/Authorization.js";
import { verifyPassword } from "../../helpers/CryptoPass.js";
import { pool } from "../DataBase/index.js";

export const LoginUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const [result] = await pool.query(
      "SELECT usuario, correo, password, id_usuairo FROM Usuario WHERE correo = ?",
      [correo]
    );

    if (result.length === 0) {
      return res.status(401).json({
        error: true,
        message: "Nombre de usuario o contraseña incorrectos",
        data: [],
      });
    }

    const storedPassword = result[0].password;
    const isValidPassword = await verifyPassword(password, storedPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        error: true,
        message: "Nombre de usuario o contraseña incorrectos",
        data: [],
      });
    }

    const data = {
      idUsuario: result[0].id_usuairo,
      usuario: result[0].usuario,
      correo: result[0].correo,
    };

    const Token = CrearToken(data);

    res.cookie("token", Token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.json({
      error: null,
      message: "Inicio de sesión exitoso",
      data: Token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Error interno del servidor",
      data: [],
    });
  }
};
