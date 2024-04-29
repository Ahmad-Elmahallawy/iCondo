import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReplyWhereUniqueInput } from "./ReplyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ReplyUpdateInput } from "./ReplyUpdateInput";

@ArgsType()
class UpdateReplyArgs {
    @ApiProperty({
        required: true,
        type: () => ReplyWhereUniqueInput,
    })
    @ValidateNested()
    @Type(() => ReplyWhereUniqueInput)
    @Field(() => ReplyWhereUniqueInput, { nullable: false })
    where!: ReplyWhereUniqueInput;

    @ApiProperty({
        required: true,
        type: () => ReplyUpdateInput,
    })
    @ValidateNested()
    @Type(() => ReplyUpdateInput)
    @Field(() => ReplyUpdateInput, { nullable: false })
    data!: ReplyUpdateInput;
}

export { UpdateReplyArgs as UpdateReplyArgs };