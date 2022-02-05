import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, description: 'name' })
  name?: string | undefined;

  @ApiProperty({ type: String, description: 'login' })
  login?: string | undefined;

  @ApiProperty({ type: String, description: 'password' })
  password?: string | undefined;
}
