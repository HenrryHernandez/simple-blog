import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  username: string;
}

const verifyTokenAndGetPayloadPromise = (
  token: string
): Promise<JwtPayload | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY + "", (error, decoded) => {
      if (error) {
        resolve(null);
      } else {
        const payload = decoded as JwtPayload;
        resolve(payload);
      }
    });
  });
};

export const verifyTokenAndGetPayload = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  const validToken = await verifyTokenAndGetPayloadPromise(token);

  if (!validToken) {
    return null;
  }

  return validToken;
};
