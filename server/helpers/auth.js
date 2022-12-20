import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

// password we save in the database compare with client password
// password: plain password from client input
// hashed: from hashed password stored in database
export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
  // return true/false
};
