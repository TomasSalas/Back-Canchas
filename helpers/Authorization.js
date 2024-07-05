import jwt from "jsonwebtoken";

const secretKey = process.env.SECRETKEY;

export const Authorization = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      error: true,
      message: "Acceso denegado. No se proporcionó token.",
      data: [],
    });
  }

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Token inválido.",
      data: [],
    });
  }
};

export const CrearToken = (data) => {
  const token = jwt.sign({ data }, secretKey, { expiresIn: "1h" });
  return token;
};
