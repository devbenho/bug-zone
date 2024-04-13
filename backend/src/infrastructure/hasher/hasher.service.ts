import bcrypt from 'bcrypt';
import { IHasherService } from '@contracts/services/IHasher';
class HasherService implements IHasherService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export { HasherService };
