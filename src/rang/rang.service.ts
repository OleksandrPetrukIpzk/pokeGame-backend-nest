import {Injectable} from "@nestjs/common";
import {CreateRangDto} from "./dto/create-rang-dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Rang} from "./schemas/rang.schema";

@Injectable()
export class RangService{
    constructor(@InjectModel(Rang.name) private rangModel: Model<Rang>) {}
    async getAllFights(): Promise<Rang[]>{
        const fights = await this.rangModel.find();
        fights.sort((a, b) =>{
            return a.timeFight.getTime() - b.timeFight.getTime()
        })
        return fights
    }
    async getFightForUserByName(name: string): Promise<Rang[]> {
        const userFightStart = await this.rangModel.find({whoStart: name});
        const userFightDefense = await  this.rangModel.find({whoDefense: name})
        const allInfo = userFightStart.concat(userFightDefense);
        allInfo.sort((a, b) =>{
            return a.timeFight.getTime() - b.timeFight.getTime()
        })
        return allInfo
    }

    async setFight(dto: CreateRangDto): Promise<Rang>{
        const fight = await this.rangModel.create({...dto,
            timeFight: new Date()
    });
        return fight

    }
}
