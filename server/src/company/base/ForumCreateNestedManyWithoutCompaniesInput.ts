import { InputType, Field } from "@nestjs/graphql";
import { ForumWhereUniqueInput } from "../../forum/base/ForumWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ForumCreateNestedManyWithoutCompaniesInput {
    @Field(() => [ForumWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [ForumWhereUniqueInput],
    })
    connect?: Array<ForumWhereUniqueInput>;
}

export { ForumCreateNestedManyWithoutCompaniesInput as ForumCreateNestedManyWithoutCompaniesInput };