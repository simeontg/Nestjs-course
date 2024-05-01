import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    async createUser(@Body() CreateUserDto: CreateUserDto) {
        return this.usersService.create(CreateUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: User) {
        return user;
    }
}
