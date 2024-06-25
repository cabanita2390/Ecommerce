import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAuth() {
    return 'Autenticacion';
  }

  async signin(email, password) {
    if (!email || !password) return 'Debe ingresar usuario y contraseña';

    const userFound = await this.usersRepository.getUserByEmail(email);
    if (!userFound || userFound.password !== password)
      return 'Credenciales incorrectas';

    return 'Usuario loggeado...(Se envía Token)';
  }
}
