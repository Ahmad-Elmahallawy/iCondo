import { InputType, Field } from "@nestjs/graphql";
import { CommonFacilityWhereUniqueInput } from "../../commonFacility/base/CommonFacilityWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CommonFacilityUpdateManyWithoutPropertiesInput {
    @Field(() => [CommonFacilityWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [CommonFacilityWhereUniqueInput],
    })
    connect?: Array<CommonFacilityWhereUniqueInput>;

    @Field(() => [CommonFacilityWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [CommonFacilityWhereUniqueInput],
    })
    disconnect?: Array<CommonFacilityWhereUniqueInput>;

    @Field(() => [CommonFacilityWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [CommonFacilityWhereUniqueInput],
    })
    set?: Array<CommonFacilityWhereUniqueInput>;
}

export { CommonFacilityUpdateManyWithoutPropertiesInput as CommonFacilityUpdateManyWithoutPropertiesInput };