import {Module} from "@nestjs/common";
import {RangController} from "./rang.controller";
import {RangService} from "./rang.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Rang, RangSchema} from "./schemas/rang.schema";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../user/constant/constant";

@Module({
    imports: [MongooseModule.forFeature([{name: Rang.name, schema: RangSchema}]),  JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '10h'},
    }),],
    controllers: [RangController],
    providers: [RangService]
})

export class RangModule {}
