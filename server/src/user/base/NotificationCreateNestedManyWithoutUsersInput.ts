import { InputType, Field } from "@nestjs/graphql";
import { NotificationWhereUniqueInput } from "../../notification/base/NotificationWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class NotificationCreateNestedManyWithoutUsersInput {
    @Field(() => [NotificationWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [NotificationWhereUniqueInput],
    })
    connect?: Array<NotificationWhereUniqueInput>;
}

export { NotificationCreateNestedManyWithoutUsersInput as NotificationCreateNestedManyWithoutUsersInput };