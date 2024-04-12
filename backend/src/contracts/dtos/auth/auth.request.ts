class AuthRequest {
  constructor(public login: string, public password: string) {}
  validate(): void {
    if (!this.login || !this.password) {
      throw new Error('Invalid request');
    }
  }
}

export { AuthRequest };
