import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './decorators/rbuc.decorator';
import { RbucGuard } from 'src/guards/rbuc.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { rolesEnum } from './enum/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post("/login")
  login(@Body() createUserDto: LoginUserDto) {
    return this.userService.login(createUserDto);
  }


  @Roles(rolesEnum.SUPERADMIN)
  @UseGuards(RbucGuard)
   @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(rolesEnum.ADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
