import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { ExtractJwt } from "passport-jwt";
import { TokenPayload } from "../interfaces/token-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            //specifies where on the request object the jwt lives
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => request?.cookies?.Authentication || request?.Authentication
            ]),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    //we get the userId when the token is decoded
    async validate({ userId }: TokenPayload) {
        return this.usersService.getUser({ id: userId });
    }
}