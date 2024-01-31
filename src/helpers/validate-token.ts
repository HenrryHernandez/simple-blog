import jwt from "jsonwebtoken";

export const validateToken = async (token: string | undefined) => {
  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY + "");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
