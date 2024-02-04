import {Module} from "@nestjs/common";
import {RangController} from "./rang.controller";
import {RangService} from "./rang.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Rang, RangSchema} from "./schemas/rang.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Rang.name, schema: RangSchema}])],
    controllers: [RangController],
    providers: [RangService]
})

export class RangModule {}
