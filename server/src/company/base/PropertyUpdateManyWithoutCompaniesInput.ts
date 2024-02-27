import { InputType, Field } from "@nestjs/graphql";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class PropertyUpdateManyWithoutCompaniesInput {
    @Field(() => [PropertyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [PropertyWhereUniqueInput],
    })
    connect?: Array<PropertyWhereUniqueInput>;

    @Field(() => [PropertyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [PropertyWhereUniqueInput],
    })
    disconnect?: Array<PropertyWhereUniqueInput>;

    @Field(() => [PropertyWhereUniqueInput], {
        nullable: true,
    })
    @ApiProperty({
        required: false,
        type: () => [PropertyWhereUniqueInput],
    })
    set?: Array<PropertyWhereUniqueInput>;
}

export { PropertyUpdateManyWithoutCompaniesInput as PropertyUpdateManyWithoutCompaniesInput };