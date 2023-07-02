import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredientialsDto } from './dto/auth-credientials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredientialsDto: AuthCredientialsDto): Promise<void> {
    return this.authService.signUp(authCredientialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredientialsDto: AuthCredientialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredientialsDto);
  }
}
