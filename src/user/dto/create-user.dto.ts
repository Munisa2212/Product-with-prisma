import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"

export class CreateUserDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    role: UserRole

    @ApiProperty()
    password: string
}


export class LoginUserDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    password: string
}
