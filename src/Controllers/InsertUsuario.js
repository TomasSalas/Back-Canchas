import { hashPassword } from '../../helpers/CryptoPass.js'
import { pool } from '../DataBase/index.js'

export const InsertUsuario = async (req, res) => {
  const { usuario, password, correo } = req.body

  try {
    const hashedPassword = await hashPassword(password)

    const [result] = await pool.query(
      'INSERT INTO Usuario (usuario, password, correo) VALUES (?, ?, ?)',
      [usuario, hashedPassword, correo]
    )

    if (result.affectedRows > 0) {
      return res.json({
        error: null,
        message: 'Usuario insertado correctamente',
        data: { usuario, correo }
      })
    } else {
      return res.json({
        error: true,
        message: 'Error al insertar el usuario',
        data: []
      })
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.json({
        error: true,
        message: 'Error: Ya existe un usuario con ese correo electrónico',
        data: []
      })
    } else {
      return res.json({
        error: true,
        message: 'Error interno del servidor',
        data: []
      })
    }
  }
}
