import { pool } from '../DataBase/index.js'

export const getUsuarios = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT usuario, correo, id_usuairo FROM Usuario'
  )

  if (rows.length > 0) {
    return res.json({
      error: false,
      data: rows
    })
  } else {
    return res.json({
      error: true,
      data: []
    })
  }
}
