import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReplyWhereInput } from "./ReplyWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ReplyOrderByInput } from "./ReplyOrderByInput";

@ArgsType()
class ReplyFindManyArgs {
    @ApiProperty({
        required: false,
        type: () => ReplyWhereInput,
    })
    @IsOptional()
    @ValidateNested()
    @Field(() => ReplyWhereInput, { nullable: true })
    @Type(() => ReplyWhereInput)
    where?: ReplyWhereInput;

    @ApiProperty({
        required: false,
        type: [ReplyOrderByInput],
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Field(() => [ReplyOrderByInput], { nullable: true })
    @Type(() => ReplyOrderByInput)
    orderBy?: Array<ReplyOrderByInput>;

    @ApiProperty({
        required: false,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    @Field(() => Number, { nullable: true })
    @Type(() => Number)
    skip?: number;

    @ApiProperty({
        required: false,
        type: Number,
    })
    @IsOptional()
    @IsInt()
    @Field(() => Number, { nullable: true })
    @Type(() => Number)
    take?: number;
}

export { ReplyFindManyArgs as ReplyFindManyArgs };