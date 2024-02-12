import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RangDocument = HydratedDocument<Rang>;

@Schema()
export class Rang {

    @Prop()
    id: number;

    @Prop()
    whoStart: string;

    @Prop()
    whoDefence: string;

    @Prop()
    whoWin: string;

    @Prop()
    timeFight: Date;
}

export const RangSchema = SchemaFactory.createForClass(Rang);
