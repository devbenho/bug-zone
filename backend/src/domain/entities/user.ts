import { AuditableBaseEntity } from '@domain/shared/auditable.entity';

class User extends AuditableBaseEntity {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public password: string,
    public role: string = 'user',
    public profilePicture: string = '',
  ) {
    super(new Date(), username, new Date(), username, null, null);
  }
  isPasswordMatched(password: string): boolean {
    return this.password === password;
  }
}

export { User };
