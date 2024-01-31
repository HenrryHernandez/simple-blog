import jwt from "jsonwebtoken";

export const generateToken = (id: number, email: string, username: string) => {
  const secretKey = String(process.env.JWT_SECRET_KEY);

  const payload = {
    id,
    email,
    username,
  };

  const options = {
    expiresIn: "30d",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};
