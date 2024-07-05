import { pool } from "../DataBase/index.js";

export const InsertArriendo = async (req, res) => {
  const {
    FechaInicio,
    HoraInicio,
    HoraFinal,
    cancha,
    nombreArrendatario,
    contactoArrendatario,
  } = req.body;

  console.log(req.body);

  const pagado = 0;

  const [result] = await pool.query(
    "INSERT INTO Reserva (fecha, hora_inicio, hora_termino, id_cancha, nombre_arrendatario, numero_arrendatario, pagada) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      FechaInicio,
      HoraInicio,
      HoraFinal,
      cancha,
      nombreArrendatario,
      contactoArrendatario,
      pagado,
    ]
  );
  console.log(result);
  if (result.affectedRows > 0) {
    return res.json({
      error: null,
      message: "Arriendo registrado correctamente",
    });
  } else {
    return res.json({
      error: true,
      message: result.code,
    });
  }
};
