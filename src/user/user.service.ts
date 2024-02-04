import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Potions, User} from "./schemas/user.schema";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user-dto";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(dto: CreateUserDto): Promise<User>{
        const initUser = {
            img: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg',
            selectedPokemon: '',
            coins: 20,
            rang: 0,
            stageInOfflineArena: 1,
            arrPokemons: [],
            arrAchives: [],
            arrPotions: [{id: 1, name:'Skip battle', count: 1}]

        }
        const isUnicalName = await this.userModel.findOne({'name': dto.name})
        const isUnicalEmail = await this.userModel.findOne({'email': dto.email})
        if(isUnicalName === null && isUnicalEmail === null){
            const user = await this.userModel.create({...dto, ...initUser})
            return user;
        }

    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const user = await this.userModel.findByIdAndDelete(id);
        return user.id
    }
    async changePassword(id: ObjectId, password: string) {
        const user = await this.userModel.findByIdAndDelete(id);
        user.password = password;
        user.save()
        return user
    }
    async changeName(id: ObjectId, userName: string) {
        const isUnicalName = await this.userModel.findOne({'name': userName})
        if(isUnicalName === null){
            const user = await this.userModel.findById(id);
            user.name = userName;
            user.save()
            return user
        }
    }
    async changeEmail(id: ObjectId, email: string) {
        const isUnicalUser = await this.userModel.findOne({'email': email});
        if(isUnicalUser === null){
            const user = await this.userModel.findById(id);
            user.name = email;
            user.save()
            return user
        }

    }
    async changeImg(id: ObjectId, img: string) {
        const user = await this.userModel.findById(id);
        user.name = img;
        user.save()
        return user
    }
    async changeRangById(id: ObjectId, rang: number){
        const user = await this.userModel.findById(id);
        if(user.rang === 0){
            return user
        }
        user.rang = rang;
        user.save()
        return user
    }
    async addPokemon(id: ObjectId, idPokemon: string){
        const user = await this.userModel.findById(id);
        if(user.arrPokemons.findIndex(pokemon => pokemon === idPokemon) === -1){
            user.arrPokemons.push(idPokemon);
            user.save();
            return user;
        }

    }
    async removePokemon(id: ObjectId, idPokemon: string){
        const user = await this.userModel.findById(id);
        const index = user.arrPokemons.findIndex(pokemon => pokemon === idPokemon)
        if(index !== -1){
            user.arrPokemons.splice(index, 1);
            user.save();
            return user;
        }
    }
    async setPotions(id: ObjectId, potion: Potions){
        const user = await this.userModel.findById(id);
        const indexPotion = user.arrPotions.findIndex(item => item.id === potion.id);
        if(indexPotion !== -1) {
            user.arrPotions[indexPotion] = potion;
        }
        else{
            user.arrPotions.push(potion);
        }
        user.save();
        return user
    }

    async changeStage(id: ObjectId, stage: number){
        const user = await this.userModel.findById(id);
        user.stageInOfflineArena = stage;
        user.save();
        return user
    }
    async changeCurrentPokemonById(id: ObjectId, pokemonId: string): Promise<User>{
    const user = await this.userModel.findById(id);
    user.selectedPokemon = pokemonId;
    user.save()
    return user
    }
    async changeCountOfMoney(id: ObjectId, money: number){
        const user = await this.userModel.findById(id);
        user.coins = money;
        user.save();
        return user
    }
    async addAchivesById(id: ObjectId, index: number) {
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
            if(user.selectedPokemon !== '' && user.rang > 0){
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
