import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Credentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserInfo } from "./UserInfo";
import { UserService } from "../user/user.service";
import { CondoUnitService } from "../condoUnit/condoUnit.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly condoUnitService: CondoUnitService,
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.user({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id, roles } = user;
      const roleList = roles as string[];
      return { id, username, roles: roleList };
    }
    return null;
  }
  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    const accessToken = await this.tokenService.createToken({
      id: user.id,
      username,
      password,
    });
    const userCondos = await this.userService.findUserCondos(user.id, {});
    let propertyID;
    if (userCondos.length !== 0 && userCondos[0].condoID != null) {
      const condoID = userCondos[0].condoID ?? -1;
      const propertyRes = await this.condoUnitService.getPropertyId(condoID);
      propertyID = propertyRes?.id;
    }
    console.log({
      accessToken,
      propertyID,
      ...user,
    });
    return {
      accessToken,
      propertyID,
      ...user,
    };
  }
}
