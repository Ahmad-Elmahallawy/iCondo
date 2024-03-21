import { InputType, Field } from "@nestjs/graphql";
import { ForumWhereUniqueInput } from "../../forum/base/ForumWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ForumUpdateManyWithoutCompaniesInput {
    @Field(() => [ForumWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ForumWhereUniqueInput],
    })
    connect?: Array<ForumWhereUniqueInput>;

    @Field(() => [ForumWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ForumWhereUniqueInput],
    })
    disconnect?: Array<ForumWhereUniqueInput>;

    @Field(() => [ForumWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ForumWhereUniqueInput],
    })
    set?: Array<ForumWhereUniqueInput>;
}

export { ForumUpdateManyWithoutCompaniesInput as ForumUpdateManyWithoutCompaniesInput };