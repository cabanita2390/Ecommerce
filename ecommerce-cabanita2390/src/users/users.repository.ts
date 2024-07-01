import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 5;

    const skip = (page - 1) * limit;

    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) return 'No se encontró el usuario';
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async addUser(user: Users) {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userNoPassword } = newUser;

    return userNoPassword;
  }

  async updateUser(dataUser: Users, id: string) {
    await this.usersRepository.update(id, dataUser);
    const updateUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updateUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
