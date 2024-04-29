import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Post } from "../../post/base/Post";

@ObjectType()
class Reply {
    @ApiProperty({
        required: false,
        type: String,
    })
    @IsString()
    @IsOptional()
    @Field(() => String, {
        nullable: true,
    })
    content!: string | null;

    @ApiProperty({
        required: true,
    })
    @IsDate()
    @Type(() => Date)
    @Field(() => Date)
    createdAt!: Date;

    @ApiProperty({
        required: true,
        type: String,
    })
    @IsString()
    @Field(() => String)
    id!: string;

    @ApiProperty({
        required: true,
        type: () => Post,
    })
    @ValidateNested()
    @Type(() => Post)
    post?: Post;

    @ApiProperty({
        required: true,
    })
    @IsDate()
    @Type(() => Date)
    @Field(() => Date)
    updatedAt!: Date;
}

export { Reply as Reply };