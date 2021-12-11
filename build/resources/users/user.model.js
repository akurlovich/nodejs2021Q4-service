import { v4 } from 'uuid';
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
var User = /** @class */ (function () {
    function User(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? v4() : _c, _d = _b.name, name = _d === void 0 ? 'USER' : _d, _e = _b.login, login = _e === void 0 ? 'user' : _e, _f = _b.password, password = _f === void 0 ? 'password' : _f;
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    User.toResponse = function (user) {
        var id = user.id, name = user.name, login = user.login;
        return { id: id, name: name, login: login };
    };
    return User;
}());
export default User;
;
