import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEnum } from "class-validator";
import { SortOrder } from "../../util/SortOrder";

@InputType({
    isAbstract: true,
    description: undefined,
})
class ReplyOrderByInput {
    @ApiProperty({
        required: false,
        enum: ["asc", "desc"],
    })
    @IsOptional()
    @IsEnum(SortOrder)
    @Field(() => SortOrder, {
        nullable: true,
    })
    content?: SortOrder;

    @ApiProperty({
        required: false,
        enum: ["asc", "desc"],
    })
    @IsOptional()
    @IsEnum(SortOrder)
    @Field(() => SortOrder, {
        nullable: true,
    })
    createdAt?: SortOrder;

    @ApiProperty({
        required: false,
        enum: ["asc", "desc"],
    })
    @IsOptional()
    @IsEnum(SortOrder)
    @Field(() => SortOrder, {
        nullable: true,
    })
    id?: SortOrder;

    @ApiProperty({
        required: false,
        enum: ["asc", "desc"],
    })
    @IsOptional()
    @IsEnum(SortOrder)
    @Field(() => SortOrder, {
        nullable: true,
    })
    postID?: SortOrder;

    @ApiProperty({
        required: false,
        enum: ["asc", "desc"],
    })
    @IsOptional()
    @IsEnum(SortOrder)
    @Field(() => SortOrder, {
        nullable: true,
    })
    updatedAt?: SortOrder;
}

export { ReplyOrderByInput as ReplyOrderByInput };