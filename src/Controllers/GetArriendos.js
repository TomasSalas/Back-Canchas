import { pool } from "../DataBase/index.js";

export const getArriendos = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM Reserva R JOIN Canchas C on R.id_cancha = C.id_cancha ORDER BY R.fecha desc"
  );

  if (rows.length > 0) {
    return res.json({
      error: false,
      data: rows,
    });
  } else {
    return res.json({
      error: true,
      data: [],
    });
  }
};
