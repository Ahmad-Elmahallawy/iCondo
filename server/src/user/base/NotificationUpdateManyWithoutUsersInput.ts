import { InputType, Field } from "@nestjs/graphql";
import { NotificationWhereUniqueInput } from "../../notification/base/NotificationWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class NotificationUpdateManyWithoutUsersInput {
    @Field(() => [NotificationWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [NotificationWhereUniqueInput],
    })
    connect?: Array<NotificationWhereUniqueInput>;

    @Field(() => [NotificationWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [NotificationWhereUniqueInput],
    })
    disconnect?: Array<NotificationWhereUniqueInput>;

    @Field(() => [NotificationWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [NotificationWhereUniqueInput],
    })
    set?: Array<NotificationWhereUniqueInput>;
}

export { NotificationUpdateManyWithoutUsersInput as NotificationUpdateManyWithoutUsersInput };
