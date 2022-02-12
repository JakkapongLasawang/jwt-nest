import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private Logger = new Logger(UsersService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ username, password }: CreateUserDto): Promise<any> {
    const hash = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
  }

  async findOne(username: string): Promise<any> {
    try {
      return await this.prisma.user.findFirst({
        where: {
          username,
        },
      });
    } catch (error) {
      this.Logger.log(error);
    }
  }
}
