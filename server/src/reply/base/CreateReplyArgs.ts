import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReplyCreateInput } from "./ReplyCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateReplyArgs {
    @ApiProperty({
        required: true,
        type: () => ReplyCreateInput,
    })
    @ValidateNested()
    @Type(() => ReplyCreateInput)
    @Field(() => ReplyCreateInput, { nullable: false })
    data!: ReplyCreateInput;
}

export { CreateReplyArgs as CreateReplyArgs };