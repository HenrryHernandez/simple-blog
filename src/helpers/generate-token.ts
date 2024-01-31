import jwt from "jsonwebtoken";

export const generateToken = (email: string) => {
  const secretKey = String(process.env.JWT_SECRET_KEY);

  const payload = {
    email,
  };

  const options = {
    expiresIn: "30d",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};
