import { InputType, Field } from "@nestjs/graphql";
import { ReplyWhereUniqueInput } from "../../reply/base/ReplyWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ReplyCreateNestedManyWithoutPostsInput {
    @Field(() => [ReplyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ReplyWhereUniqueInput],
    })
    connect?: Array<ReplyWhereUniqueInput>;
}

export { ReplyCreateNestedManyWithoutPostsInput as ReplyCreateNestedManyWithoutPostsInput };