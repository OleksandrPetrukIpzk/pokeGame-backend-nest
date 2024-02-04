import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {UserModule} from "./user/user.module";
import {RangModule} from "./rang/rang.module";

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://olexsandrpetruk:Caha2002@cluster0.0esah22.mongodb.net/?retryWrites=true&w=majority'), UserModule, RangModule],
})
export class AppModule {}
