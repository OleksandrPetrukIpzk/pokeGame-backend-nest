import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {ObjectId} from "mongoose";
import {Potions, User} from "./schemas/user.schema";
import {AuthGuard} from "./auth.guard";


@Controller('/user')

export class UserController{
    constructor(private readonly userService: UserService,) {
    }
    @Post()
     create(@Body() dto: CreateUserDto): Promise<{ user:User, access_token: string }>{
    return this.userService.create(dto)
    }
    @Post('/login')
    logIn(@Body() dto: CreateUserDto): Promise<{
        user: User,
        access_token: string
    }>{
        return this.userService.logIn(dto)
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
     delete(@Param('id') id: ObjectId): Promise<ObjectId>{
        return this.userService.delete(id)
    }
    @UseGuards(AuthGuard)
    @Post('/password/:id')
     changePassword(@Param('id') id: ObjectId, @Body() {password}: {password: string}): Promise<User> {
        return this.userService.changePassword(id, password)
    }
    @UseGuards(AuthGuard)
    @Post('/name/:id')
     changeName(@Param('id') id: ObjectId, @Body() {userName}: {userName: string}): Promise<User> {
        return this.userService.changeName(id, userName)
    }
    @UseGuards(AuthGuard)
    @Post('/email/:id')
     changeEmail(@Param('id') id: ObjectId, @Body() {email}: {email: string}): Promise<User> {
        return this.userService.changeEmail(id, email)
    }
    @UseGuards(AuthGuard)
    @Post('/img/:id')
     changeImg(@Param('id') id: ObjectId, @Body() {img}: {img: string}): Promise<User> {
        return this.userService.changeImg(id, img)
    }
    @UseGuards(AuthGuard)
    @Post('/rang/:id')
    changeRangById(@Param('id') id: ObjectId, @Body() {rang}: {rang: number}) : Promise<User>{
        return this.userService.changeRangById(id, rang)
    }
    @UseGuards(AuthGuard)
    @Post('/pokemon/:id')
     addPokemon(@Param('id') id: ObjectId, @Body() {idPokemon}: {idPokemon: string}) : Promise<User>{
      return this.userService.addPokemon(id, idPokemon)
    }
    @UseGuards(AuthGuard)
    @Post('/removePokemon/:id')
     removePokemon(@Param('id') id: ObjectId, @Body() {idPokemon}: {idPokemon: string}) : Promise<User>{
        return this.userService.removePokemon(id, idPokemon)
    }
    @UseGuards(AuthGuard)
    @Post('/setPotion/:id')
     setPotions(@Param('id') id: ObjectId, @Body() {potion}: {potion: Potions}) : Promise<User>{
        return this.userService.setPotions(id, potion)
    }
    @UseGuards(AuthGuard)
    @Post('/stage/:id')
     changeStage(@Param('id') id: ObjectId, @Body() {stage}: {stage: number}) : Promise<User>{
        return this.userService.changeStage(id, stage)
    }
    @UseGuards(AuthGuard)
    @Post('/select/:id')
    changeCurrentPokemonById(@Param('id')id: ObjectId, @Body() {pokemonId}: {pokemonId: string }) : Promise<User>{
        if(Number(pokemonId) <= 1200){
            return this.userService.changeCurrentPokemonById(id, pokemonId)
        }
    }
    @UseGuards(AuthGuard)
    @Post('/money/:id')
     changeCountOfMoney(@Param('id')id: ObjectId, @Body() {money}: {money: number }) : Promise<User>{
        return this.userService.changeCountOfMoney(id, money)
    }
    @UseGuards(AuthGuard)
    @Post('/achive/:id')
    addAchivesById(@Param('id')id: ObjectId, @Body() {index}: {index: number }) : Promise<User>{
        return this.userService.addAchivesById(id, index)
    }
    @UseGuards(AuthGuard)
    @Get()
     getAll(): Promise<User[]> {
        return this.userService.getAll()
    }
    @UseGuards(AuthGuard)
    @Get(':id')
     getUserById(@Param('id') id: ObjectId): Promise<User> {
        return this.userService.getUserById(id)
    }

}
