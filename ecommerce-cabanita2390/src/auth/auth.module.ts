import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}

/*

{
  "userId":"2a8ae9dc-8818-4f8a-bd4e-b7a7b9cbc483",
  "products":[
     {
   			"id":"b4b47816-bf2f-463e-b2fd-40e16d65ad4a"
  	 },
		 {
		   	"id":"98f41576-5f0e-4a38-8c3e-2f72fa5f0d16"
			}
    ]
}
    
*/

