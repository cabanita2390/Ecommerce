import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserModificate } from './users.repository';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //*GET /users
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    return this.usersService.getUsers(page, limit);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);
    return user;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() user: User) {
    const newUser = this.usersService.createUser(user);
    return newUser;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Body() dataUser: UserModificate, @Param('id') id: string) {
    const updatedUser = this.usersService.updateUser(dataUser, id);
    return updatedUser;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    const deletedUser = this.usersService.deleteUser(id);
    return deletedUser;
  }
}

//pendiente actividad 04 de clase 4 y lecture clase 5. Video: 49:22
