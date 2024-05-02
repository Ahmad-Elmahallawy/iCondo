import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommonFacilityWhereUniqueInput } from "./CommonFacilityWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CommonFacilityFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => CommonFacilityWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityWhereUniqueInput)
  @Field(() => CommonFacilityWhereUniqueInput, { nullable: false })
  where!: CommonFacilityWhereUniqueInput;
}

export { CommonFacilityFindUniqueArgs as CommonFacilityFindUniqueArgs };
