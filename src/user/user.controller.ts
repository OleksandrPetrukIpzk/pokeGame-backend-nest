import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {ObjectId} from "mongoose";
import {Potions} from "./schemas/user.schema";


@Controller('/user')

export class UserController{
    constructor(private readonly userService: UserService) {
    }
    @Post()
     create(@Body() dto: CreateUserDto){
    return this.userService.create(dto)
    }
    @Delete(':id')
     delete(@Param('id') id: ObjectId){
        return this.userService.delete(id)
    }
    @Post('/password/:id')
     changePassword(@Param('id') id: ObjectId, @Body() {password}: {password: string}) {
        return this.userService.changePassword(id, password)
    }
    @Post('/name/:id')
     changeName(@Param('id') id: ObjectId, @Body() {userName}: {userName: string}) {
        return this.userService.changeName(id, userName)
    }
    @Post('/email/:id')
     changeEmail(@Param('id') id: ObjectId, @Body() {email}: {email: string}) {
        return this.userService.changeEmail(id, email)
    }
    @Post('/img/:id')
     changeImg(@Param('id') id: ObjectId, @Body() {img}: {img: string}) {
        return this.userService.changeImg(id, img)
    }
    @Post('/rang/:id')
    changeRangById(@Param('id') id: ObjectId, @Body() {rang}: {rang: number}){
        return this.userService.changeRangById(id, rang)
    }
    @Post('/pokemon/:id')
     addPokemon(@Param('id') id: ObjectId, @Body() {idPokemon}: {idPokemon: string}){
      return this.userService.addPokemon(id, idPokemon)
    }
    @Post('/removePokemon/:id')
     removePokemon(@Param('id') id: ObjectId, @Body() {idPokemon}: {idPokemon: string}){
        return this.userService.removePokemon(id, idPokemon)
    }
    @Post('/removePokemon/:id')
     setPotions(@Param('id') id: ObjectId, @Body() {potion}: {potion: Potions}){
        return this.userService.setPotions(id, potion)
    }
    @Post('/stage/:id')
     changeStage(@Param('id') id: ObjectId, @Body() {stage}: {stage: number}){
        return this.userService.changeStage(id, stage)
    }
    @Post('/select/:id')
    changeCurrentPokemonById(@Param('id')id: ObjectId, @Body() {pokemonId}: {pokemonId: string }){
        if(Number(pokemonId) <= 1200){
            return this.userService.changeCurrentPokemonById(id, pokemonId)
        }
    }
    @Post('/money/:id')
     changeCountOfMoney(@Param('id')id: ObjectId, @Body() {money}: {money: number }){
        return this.userService.changeCountOfMoney(id, money)
    }
    @Post('/achive/:id')
    addAchivesById(@Param('id')id: ObjectId, @Body() {index}: {index: number }) {
        return this.userService.addAchivesById(id, index)
    }
    @Get()
     getAll() {
        return this.userService.getAll()
    }
    @Get(':id')
     getUserById(@Param('id') id: ObjectId) {
        return this.userService.getUserById(id)
    }

}
