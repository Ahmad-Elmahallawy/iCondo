import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommonFacilityWhereUniqueInput } from "./CommonFacilityWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CommonFacilityUpdateInput } from "./CommonFacilityUpdateInput";

@ArgsType()
class UpdateCommonFacilityArgs {
  @ApiProperty({
    required: true,
    type: () => CommonFacilityWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityWhereUniqueInput)
  @Field(() => CommonFacilityWhereUniqueInput, { nullable: false })
  where!: CommonFacilityWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CommonFacilityUpdateInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityUpdateInput)
  @Field(() => CommonFacilityUpdateInput, { nullable: false })
  data!: CommonFacilityUpdateInput;
}

export { UpdateCommonFacilityArgs as UpdateCommonFacilityArgs };
