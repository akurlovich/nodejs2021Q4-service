import { v4 as uuid } from 'uuid';

class User {
  id?: string;  

  name?: string;

  login?: string;

  password?: string;

  constructor(
    {
      id = uuid(),
      name = 'TEST_USER',
      login = 'test_user',
      password = 'P@55w0rd',
    } = {} as User
  ) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): User {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
