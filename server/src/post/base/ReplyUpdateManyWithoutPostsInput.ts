import { InputType, Field } from "@nestjs/graphql";
import { ReplyWhereUniqueInput } from "../../reply/base/ReplyWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ReplyUpdateManyWithoutPostsInput {
    @Field(() => [ReplyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ReplyWhereUniqueInput],
    })
    connect?: Array<ReplyWhereUniqueInput>;

    @Field(() => [ReplyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ReplyWhereUniqueInput],
    })
    disconnect?: Array<ReplyWhereUniqueInput>;

    @Field(() => [ReplyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ReplyWhereUniqueInput],
    })
    set?: Array<ReplyWhereUniqueInput>;
}

export { ReplyUpdateManyWithoutPostsInput as ReplyUpdateManyWithoutPostsInput };