import { InputType, Field } from "@nestjs/graphql";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class PropertyCreateNestedManyWithoutCompaniesInput {
    @Field(() => [PropertyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [PropertyWhereUniqueInput],
    })
    connect?: Array<PropertyWhereUniqueInput>;
}

export { PropertyCreateNestedManyWithoutCompaniesInput as PropertyCreateNestedManyWithoutCompaniesInput };