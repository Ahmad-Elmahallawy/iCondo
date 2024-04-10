import { InputType, Field } from "@nestjs/graphql";
import { CommonFacilityWhereUniqueInput } from "../../commonFacility/base/CommonFacilityWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class CommonFacilityCreateNestedManyWithoutPropertiesInput {
    @Field(() => [CommonFacilityWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [CommonFacilityWhereUniqueInput],
    })
    connect?: Array<CommonFacilityWhereUniqueInput>;
}

export { CommonFacilityCreateNestedManyWithoutPropertiesInput as CommonFacilityCreateNestedManyWithoutPropertiesInput };