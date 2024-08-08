import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(email: string, pass: string) : Promise<any> {
    const user = await this.userService.findOneUser(email);

    if (user?.password !== pass) throw new UnprocessableEntityException();

    const { password, ...result } = user;
    return result;
  }
}
