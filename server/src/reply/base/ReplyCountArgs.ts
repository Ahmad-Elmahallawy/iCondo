import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReplyWhereInput } from "./ReplyWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class ReplyCountArgs {
    @ApiProperty({
        required: false,
        type: () => ReplyWhereInput,
    })
    @Field(() => ReplyWhereInput, { nullable: true })
    @Type(() => ReplyWhereInput)
    where?: ReplyWhereInput;
}

export { ReplyCountArgs as ReplyCountArgs };