import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { StringFilter } from "../../util/StringFilter";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";

@InputType()
class ReplyWhereInput {
    @ApiProperty({
        required: false,
        type: StringNullableFilter,
    })
    @Type(() => StringNullableFilter)
    @IsOptional()
    @Field(() => StringNullableFilter, {
        nullable: true,
    })
    content?: StringNullableFilter;

    @ApiProperty({
        required: false,
        type: StringFilter,
    })
    @Type(() => StringFilter)
    @IsOptional()
    @Field(() => StringFilter, {
        nullable: true,
    })
    id?: StringFilter;

    @ApiProperty({
        required: false,
        type: () => PostWhereUniqueInput,
    })
    @ValidateNested()
    @Type(() => PostWhereUniqueInput)
    @IsOptional()
    @Field(() => PostWhereUniqueInput, {
        nullable: true,
    })
    post?: PostWhereUniqueInput;
}

export { ReplyWhereInput as ReplyWhereInput };