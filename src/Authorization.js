import jwt from "jsonwebtoken";

const secretKey = process.env.SECRETKEY;

export const Authorization = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ error: "No Existe Token." });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ error: "Error en el Token." });
    }
    next();
  });
};
