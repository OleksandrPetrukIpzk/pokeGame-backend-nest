import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Potions, User} from "./schemas/user.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user-dto";
import { JwtService } from '@nestjs/jwt';
import {INIT_USER} from "./constant/constant";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private readonly jwtService: JwtService
                ) {}

    async create(dto: CreateUserDto): Promise<{user: User, access_token: string }>{
        const isUnicalName = await this.userModel.findOne({name: dto.name})
        const isUnicalEmail = await this.userModel.findOne({email: dto.email})
        if(isUnicalName){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'This name is used',
            }, HttpStatus.NOT_ACCEPTABLE);
        }
        if(isUnicalEmail){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'This email is used',
            }, HttpStatus.NOT_ACCEPTABLE);
        }
        if(isUnicalName === null && isUnicalEmail === null){
            const hashPassword = await bcrypt.hash(dto.password, 3)
            const {password, ...result} = dto;
            const user = await this.userModel.create({...result, password: hashPassword, ...INIT_USER})
            const payload = {sub: user._id, username: user.name}
            const token = await this.jwtService.signAsync(payload)
            return {
                user,
                access_token: token
            }
        }

    }
    async logIn(dto: CreateUserDto): Promise<{
        user: User,
        access_token: string }> {
        try{
            const user = await this.userModel.findOne({name: dto.name});
            const isMatch = await bcrypt.compare(dto.password, user.password)
            if(!isMatch){
                throw new HttpException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'Wrong password',
                }, HttpStatus.NOT_ACCEPTABLE);
            }
            const payload = {sub: user._id, username: user.name}
            const token = await this.jwtService.signAsync(payload)
            return {
                user,
                access_token: token
            }
        }
        catch (e){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'Wrong credentials',
            }, HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async delete(id: ObjectId): Promise<ObjectId>{
        const user = await this.userModel.findByIdAndDelete(id);
        return user.id
    }
    async changePassword(id: ObjectId, password: string): Promise<User> {
        const updatedPassword: string = await bcrypt.hash(password, 3);
        const user = await this.userModel.findById(id);
        user.password = updatedPassword;
        user.save()
        return user
    }
    async changeName(id: ObjectId, userName: string): Promise<User> {
        const isUnicalName = await this.userModel.findOne({name: userName})
        if(isUnicalName){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'This name is used',
            }, HttpStatus.NOT_ACCEPTABLE);
        }
        if(isUnicalName === null){
            const user = await this.userModel.findById(id);
            user.name = userName;
            user.save()
            return user
        }
    }
    async changeEmail(id: ObjectId, email: string): Promise<User> {
        const isUnicalUser = await this.userModel.findOne({email: email});
        if(isUnicalUser){
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'This email is used',
            }, HttpStatus.NOT_ACCEPTABLE);
        }
        if(isUnicalUser === null){
            const user = await this.userModel.findById(id);
            user.email = email;
            user.save()
            return user
        }

    }
    async changeImg(id: ObjectId, img: string): Promise<User> {
        const user = await this.userModel.findById(id);
        user.img = img;
        user.save();
        return user
    }
    async changeRangById(id: ObjectId, rang: number): Promise<User>{
        const user = await this.userModel.findById(id);
        if(user.rang === 0 && rang < 0){
            return user
        }
        user.rang = rang;
        user.save()
        return user
    }
    async addPokemon(id: ObjectId, idPokemon: string): Promise<User>{
        const user = await this.userModel.findById(id);
        if(user.arrPokemons.findIndex(pokemon => pokemon === idPokemon) === -1){
            user.arrPokemons.push(idPokemon);
            user.save();
            return user;
        }

    }
    async removePokemon(id: ObjectId, idPokemon: string): Promise<User>{
        const user = await this.userModel.findById(id);
        const index = user.arrPokemons.findIndex(pokemon => pokemon === idPokemon)
        if(index !== -1){
            user.arrPokemons.splice(index, 1);
            user.save();
            return user;
        }
    }
    async setPotions(id: ObjectId, potion: Potions): Promise<User>{
        const user = await this.userModel.findById(id);
        const indexPotion = user.arrPotions.findIndex(item => item.id === potion.id);
        if(indexPotion !== -1) {
            const count = user.arrPotions[indexPotion].count + 1;
            user.arrPotions[indexPotion].count = count;
        }
        else{
            user.arrPotions.push(potion);
        }
        user.markModified('arrPotions');
        await user.save();
        return user
    }

    async changeStage(id: ObjectId, stage: number): Promise<User>{
        const user = await this.userModel.findById(id);
        user.stageInOfflineArena = stage;
        user.save();
        return user
    }
    async changeCurrentPokemonById(id: ObjectId, pokemonId: string): Promise<User>{
        const user = await this.userModel.findById(id);
    user.selectedPokemon = pokemonId;
    user.save();
    return user
    }
    async changeCountOfMoney(id: ObjectId, money: number): Promise<User>{
        const user = await this.userModel.findById(id);
        user.coins = money;
        user.save();
        return user
    }
    async addAchivesById(id: ObjectId, index: number): Promise<User> {
        const user = await this.userModel.findById(id);
        if(user.arrAchives.findIndex(achive => achive === index) === -1){
            user.arrAchives.push(index);
            user.save();
            return user
        }
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find()
        const usersWithPokemons: User[] = []
        users.map((user) => {
            if(user.selectedPokemon !== '' && user.rang >= 0){
                usersWithPokemons.push(user);
            }
        })
        return usersWithPokemons
    }


    async getUserById(id: ObjectId): Promise<User> {
        const user = await this.userModel.findById(id);
        return user
    }


}
