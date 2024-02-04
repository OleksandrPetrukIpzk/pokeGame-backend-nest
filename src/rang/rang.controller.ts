import {Body, Controller, Post} from "@nestjs/common";
import {RangService} from "./rang.service";
import {CreateRangDto} from "./dto/create-rang-dto";
import {Rang} from "./schemas/rang.schema";

@Controller('/rang')

export class RangController{
    constructor( private readonly rangService: RangService) {

    }
     getAllFights(): Promise<Rang[]>{
        return this.rangService.getAllFights()
    }
     getFightForUserByName(@Body() {name}: { name: string }): Promise<Rang[]> {
        return this.rangService.getFightForUserByName(name)
    }
    @Post()
     setFight(@Body() dto: CreateRangDto): Promise<Rang> {
        return this.rangService.setFight(dto)
    }
}
