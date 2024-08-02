import { pool } from '../DataBase/index.js'

export const UpdateTipoPago = async (req, res) => {
  const { idArriendo, idPago, pago } = req.body

  const [result] = await pool.query(
    'UPDATE Reserva SET id_pago = ?, pagada = ? WHERE id_arriendo = ?',
    [idPago, idArriendo, pago]
  )

  if (result.affectedRows > 0) {
    return res.json({
      error: false,
      data: 'Pago actualizado'
    })
  } else {
    return res.json({
      error: true,
      data: 'Error en actualizar el pago'
    })
  }
}
