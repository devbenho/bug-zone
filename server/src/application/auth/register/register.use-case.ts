// import 'reflect-metadata';
// import { AuthResponseDto } from '@contracts/dtos/auth';
// import { CreateUserDto } from '@contracts/dtos/users';
// import { TYPES } from '@infrastructure/shared/ioc/types';
// import { inject, injectable } from 'inversify';
// import { BaseUseCase } from '@application/shared';
// import { UserRepository } from '@domain/repositories/user.repository';
// import { log } from 'console';
// import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';

// @injectable()
// class RegisterUsecase extends BaseUseCase<CreateUserDto, AuthResponseDto> {
//   private _userRepository: UserRepository,
//   private _jwtService: TokenProviderDomainService,

//   public async performOperation(
//     request: CreateUserDto,
//   ): Promise<AuthResponseDto> {
//     const user = request.toEntity();
//     const createdUser = await this._userRepository.saveUser(user);
//     log('createdUser', createdUser);
//     const result: AuthResponseDto = {
//       token: this._jwtService.({ userId: createdUser.id as string }),
//       tokenExpiration: new Date(Date.now() + 1000 * 60 * 60),
//       // refreshToken: this._jwtService.sign({ userId: createdUser.id as string }),
//       // refreshTokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
//       userDetails: createdUser,
//     };
//     return result;
//   }
// }

// export { RegisterUsecase };
