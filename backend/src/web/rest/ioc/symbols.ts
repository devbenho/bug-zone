let symbols = {
  IAuthService: Symbol.for('IAuthService'),
  IUserService: Symbol.for('IUserService'),
  IJwtService: Symbol.for('IJwtService'),
  IHasherService: Symbol.for('IHasherService'),
  ILoginInputPort: Symbol.for('ILoginInputPort'),
  IRegisterInputPort: Symbol.for('IRegisterInputPort'),
  ILoginOutputPort: Symbol.for('ILoginOutputPort'),
  IRegisterOutputPort: Symbol.for('IRegisterOutputPort'),
  IUserRepository: Symbol.for('IUserRepository'),
  IUserController: Symbol.for('IUserController'),
  IAuthController: Symbol.for('IAuthController'),
  ApplicationRouter: Symbol.for('ApplicationRouter'),
  DataSource: Symbol.for('DataSource'),
  IMapper: Symbol.for('IMapper'),
};

export { symbols };
