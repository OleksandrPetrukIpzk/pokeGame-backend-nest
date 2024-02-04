import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

export type Potions = {
    id: number,
    name: string,
    count: number
}
@Schema()
export class User {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    img: string;

    @Prop()
    selectedPokemon: string;

    @Prop()
    coins: number;

    @Prop()
    rang: number;

    @Prop()
    stageInOfflineArena: number;

    @Prop([String])
    arrPokemons: string[];

    @Prop([Number])
    arrAchives: number[];

    @Prop()
    arrPotions: Potions[];

}

export const UserSchema = SchemaFactory.createForClass(User);
