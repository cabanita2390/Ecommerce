import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: string, limit: string) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const newUsers = this.usersRepository.getUsers(pageNumber, limitNumber);

    return newUsers;
  }

  getUserById(id: string) {
    const user = this.usersRepository.getUserById(id);
    return user;
  }

  createUser(user: Users) {
    const newUser = this.usersRepository.addUser(user);
    return newUser;
  }

  updateUser(dataUser: Users, id: string) {
    const updatedUser = this.usersRepository.updateUser(dataUser, id);
    return updatedUser;
  }

  deleteUser(id: string) {
    const deletedUser = this.usersRepository.deleteUser(id);
    return deletedUser;
  }
}
