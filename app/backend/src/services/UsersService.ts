import { ModelStatic } from 'sequelize';
// import * as bcrypt from 'bcryptjs';
import { ILogin } from '../interfaces/ILogin';
import UsersModel from '../database/models/UsersModel';
// import { createToken } from '../auth/token';

export default class LoginService {
  private model: ModelStatic<UsersModel> = UsersModel;

  public async makeLogin(user: ILogin) {
    const result = await this.model.findOne({ where: { email: user.email } });
    return result;
  }

  public async loginRole(user: ILogin) {
    const result = await this.model.findOne({ where: { role: user.role } });
    return result;
  }
}
