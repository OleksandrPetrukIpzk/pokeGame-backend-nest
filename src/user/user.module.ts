import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constant/constant";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";


@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '10h'},
    }),],
    controllers: [UserController],
    providers: [UserService,]
})

export class UserModule {}
