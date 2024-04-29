import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReplyWhereUniqueInput } from "./ReplyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class DeleteReplyArgs {
    @ApiProperty({
        required: true,
        type: () => ReplyWhereUniqueInput,
    })
    @ValidateNested()
    @Type(() => ReplyWhereUniqueInput)
    @Field(() => ReplyWhereUniqueInput, { nullable: false })
    where!: ReplyWhereUniqueInput;
}

export { DeleteReplyArgs as DeleteReplyArgs };