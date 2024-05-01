import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user-dto';

@Injectable()
export class UsersService {
    
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {

        await this.validateCreateUserDto(createUserDto);

        const user = new User({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        })

        return this.usersRepository.create(user);
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email});
        } catch (err) {
            return;
        }

        throw new UnprocessableEntityException('Email already exists');
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credentials are not valid');
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto);
    }
}
