let TYPES = {
  IAuthService: Symbol.for('IAuthService'),
  IJwtService: Symbol.for('IJwtService'),
  IHasherService: Symbol.for('IHasherService'),
  ILoginInputPort: Symbol.for('ILoginInputPort'),
  IRegisterInputPort: Symbol.for('IRegisterInputPort'),

  ICreatePostInputPort: Symbol.for('ICreatePostInputPort'),
  IFindAllPostInputPort: Symbol.for('IFindAllPostInputPort'),
  ICreatePostOutputPort: Symbol.for('ICreatePostOutputPort'),

  ILoginOutputPort: Symbol.for('ILoginOutputPort'),
  IRegisterOutputPort: Symbol.for('IRegisterOutputPort'),
  IUserRepository: Symbol.for('IUserRepository'),
  IPostRepository: Symbol.for('IPostRepository'),
  IUserController: Symbol.for('IUserController'),
  IAuthController: Symbol.for('IAuthController'),
  IPostController: Symbol.for('IPostController'),
  ApplicationRouter: Symbol.for('ApplicationRouter'),
  DataSource: Symbol.for('DataSource'),
  IUserMapper: Symbol.for('IMapper<User, CreateUserDto>'),
};

export { TYPES };
