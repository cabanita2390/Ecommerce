import { Injectable } from '@nestjs/common';
import { User, UserModificate, UsersRepository } from './users.repository';

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

  createUser(user: User) {
    const newUser = this.usersRepository.createUser(user);
    return newUser;
  }

  updateUser(dataUser: UserModificate, id: string) {
    const updatedUser = this.usersRepository.updateUser(dataUser, id);
    return updatedUser;
  }

  deleteUser(id: string) {
    const deletedUser = this.usersRepository.deleteUser(id);
    return deletedUser;
  }
}
