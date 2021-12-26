import { v4 } from 'uuid';
import { IUser } from '../../types/types';

// class User {
//   id?: string = v4();
//   name: string = 'username';
//   login: string = 'userlogin';
//   password: string = 'userpassword';

//   constructor({ id, name, login, password }: IUser = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user: IUser) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }

export default class User {
  id?: string;
  name: string;
  login: string;
  password?: string;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'password'
  } = {} as IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
};

