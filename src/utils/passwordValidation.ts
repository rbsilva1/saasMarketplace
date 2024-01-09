import { compare } from 'bcryptjs';

export const passwordValidation = async (password: string, passwordHash: string) => {
  const passwordIsValid = await compare(password, passwordHash);

  if (!passwordIsValid) {
    return false;
  }

  return true;
}