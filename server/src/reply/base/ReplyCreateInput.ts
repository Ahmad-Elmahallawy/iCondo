import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";
import { Type } from "class-transformer";

@InputType()
class ReplyCreateInput {
    @ApiProperty({
        required: false,
        type: String,
    })
    @IsString()
    @IsOptional()
    @Field(() => String, {
        nullable: true,
    })
    content?: string | null;

    @ApiProperty({
        required: true,
        type: () => PostWhereUniqueInput,
    })
    @ValidateNested()
    @Type(() => PostWhereUniqueInput)
    @Field(() => PostWhereUniqueInput)
    post!: PostWhereUniqueInput;
}

export { ReplyCreateInput as ReplyCreateInput };