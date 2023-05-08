import jwt from "jsonwebtoken";

export const generateJWT = async (payload: { email: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  return token;
};
