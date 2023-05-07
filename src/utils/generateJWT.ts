import * as jose from "jose";

export const generateJWT = async (payload: { email: string }) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);
  return token;
};
