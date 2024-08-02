import { pool } from '../DataBase/index.js'

export const UpdateTipoPago = async (req, res) => {
  console.log(req.body)
  const { idArriendo, idPago, pago } = req.body

  try {
    const [result] = await pool.query(
      'UPDATE Reserva SET id_pago = ?, pagada = ? WHERE id_arriendo = ?',
      [idPago, pago, idArriendo]
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
  } catch (error) {
    console.error(error)
    return res.json({
      error: true,
      data: 'Error en la base de datos'
    })
  }
}
