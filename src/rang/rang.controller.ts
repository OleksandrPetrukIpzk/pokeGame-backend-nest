import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {RangService} from "./rang.service";
import {CreateRangDto} from "./dto/create-rang-dto";
import {Rang} from "./schemas/rang.schema";
import {AuthGuard} from "../user/auth.guard";

@Controller('/rang')

export class RangController{
    constructor( private readonly rangService: RangService) {

    }
    @UseGuards(AuthGuard)
    @Get()
     getAllFights(): Promise<Rang[]>{
        return this.rangService.getAllFights()
    }
    @UseGuards(AuthGuard)
    @Get()
     getFightForUserByName(@Body() {name}: { name: string }): Promise<Rang[]> {
        return this.rangService.getFightForUserByName(name)
    }
    @UseGuards(AuthGuard)
    @Post()
     setFight(@Body() dto: CreateRangDto): Promise<Rang> {
        return this.rangService.setFight(dto)
    }
}
