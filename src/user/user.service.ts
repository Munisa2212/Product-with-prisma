import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt"
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService, private jwt: JwtService){}

  async findUser(name: string){
    const user = await this.prisma.user.findFirst({where: {name}})
    return user
  }
  
  async register(data: CreateUserDto) {
    const user = await this.findUser(data.name)
    if(user){
      throw new BadRequestException("User already exists")
    }

    const hash = bcrypt.hashSync(data.password, 10)
    const newUser = await this.prisma.user.create({data: {...data, password: hash}})
    return newUser
  }

  async login(data: LoginUserDto) {
    const user = await this.findUser(data.name)
    if(!user){
      throw new BadRequestException("User not exists")
    }

    const match = bcrypt.compareSync(data.password, user.password)
    if(!match){
      throw new BadRequestException("Password is wrong")
    }

    const jwt = this.jwt.sign({id: user.id, role: user.role})
    return {jwt}
  }

  async update(id: string, data: UpdateUserDto) {
    const one = await this.prisma.user.update({where: {id}, data})
    return one
  }

  async remove(id: string) {
    const one = await this.prisma.user.delete({where: {id}})
    return one;
  }
}
