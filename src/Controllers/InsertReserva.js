import { pool } from '../DataBase/index.js'

export const InsertArriendo = async (req, res) => {
  const {
    FechaInicio,
    HoraInicio,
    HoraFinal,
    cancha,
    nombreArrendatario,
    contactoArrendatario
  } = req.body

  const pagado = 0

  const [existingReservations] = await pool.query(
    `SELECT * FROM Reserva R
    WHERE R.id_cancha = ? AND R.fecha = ? AND
    (
        (? BETWEEN R.hora_inicio AND R.hora_termino)
        OR (? BETWEEN R.hora_inicio AND R.hora_termino)
    );`,
    [cancha, FechaInicio, HoraInicio, HoraFinal]
  )

  if (existingReservations.length > 0) {
    return res.json({
      error: true,
      message: 'Cancha Ocupada'
    })
  }

  const [result] = await pool.query(
    'INSERT INTO Reserva (fecha, hora_inicio, hora_termino, id_cancha, nombre_arrendatario, numero_arrendatario, pagada) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      FechaInicio,
      HoraInicio,
      HoraFinal,
      cancha,
      nombreArrendatario,
      contactoArrendatario,
      pagado
    ]
  )

  if (result.affectedRows > 0) {
    return res.json({
      error: null,
      message: 'Arriendo registrado correctamente'
    })
  } else {
    return res.json({
      error: true,
      message: result.code
    })
  }
}
