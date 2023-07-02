import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredientialsDto } from './dto/auth-credientials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredientialsDto: AuthCredientialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredientialsDto);
  }

  async signIn(
    authCredientialsDto: AuthCredientialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredientialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
