import bcrypt from 'bcryptjs';

export const hashString = async (str: string ): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(str, salt);
  return hash;
};

export const checkHashString = async (str: string, hash: string) => {
  await bcrypt.compare(str, hash); 
};
