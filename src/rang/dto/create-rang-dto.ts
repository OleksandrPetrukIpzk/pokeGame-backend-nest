import {IsNotEmpty} from "class-validator";

export class CreateRangDto {
    @IsNotEmpty()
    readonly whoStart: string;
    @IsNotEmpty()
    readonly whoDefence: string;
    @IsNotEmpty()
    readonly whoWin: string;
}
