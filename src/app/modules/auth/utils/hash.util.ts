import * as bcrypt from 'bcrypt';

export class HashUtils {
  static hash(string: string): Promise<string> {
    const saltOrRounds = process.env.HASH_SALT;
    return bcrypt.hash(string, saltOrRounds);
  }
}
