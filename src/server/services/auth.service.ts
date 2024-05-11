import bcrypt from "bcrypt";
export const hashPassword = async (args: {
  plaintextPassword: string;
}): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(args.plaintextPassword, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
  return hashedPassword;
};

export async function comparePasswordToHash(args: {
  plaintextPassword: string;
  hash: string;
}): Promise<{
  isEqual: boolean;
}> {
  const isEqual = await bcrypt.compare(args.plaintextPassword, args.hash);
  return {
    isEqual,
  };
}
