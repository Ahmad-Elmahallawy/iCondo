import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReplyWhereInput } from "./ReplyWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ReplyListRelationFilter {
    @ApiProperty({
        required: false,
        type: () => ReplyWhereInput,
    })
    @ValidateNested()
    @Type(() => ReplyWhereInput)
    @IsOptional()
    @Field(() => ReplyWhereInput, {
        nullable: true,
    })
    every?: ReplyWhereInput;

    @ApiProperty({
        required: false,
        type: () => ReplyWhereInput,
    })
    @ValidateNested()
    @Type(() => ReplyWhereInput)
    @IsOptional()
    @Field(() => ReplyWhereInput, {
        nullable: true,
    })
    some?: ReplyWhereInput;

    @ApiProperty({
        required: false,
        type: () => ReplyWhereInput,
    })
    @ValidateNested()
    @Type(() => ReplyWhereInput)
    @IsOptional()
    @Field(() => ReplyWhereInput, {
        nullable: true,
    })
    none?: ReplyWhereInput;
}
export { ReplyListRelationFilter as ReplyListRelationFilter };