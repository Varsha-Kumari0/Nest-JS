/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredientialsDto } from './dto/auth-credientials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredientialsDto: AuthCredientialsDto): Promise<void> {
    const { username, password } = authCredientialsDto;

    // hash
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hasedPassword });

    try {
      await this.save(user);
    } catch (error) {
      //   console.log(error.code);
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
