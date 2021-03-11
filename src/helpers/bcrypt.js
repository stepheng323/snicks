import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../config/contants';

export const hashPassword = async (plaintextPassword) => {
  const hashedPassword = await bcrypt.hash(
    plaintextPassword,
    Number(SALT_ROUND)
  );
  return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};
