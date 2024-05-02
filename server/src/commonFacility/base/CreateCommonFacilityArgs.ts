import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommonFacilityCreateInput } from "./CommonFacilityCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateCommonFacilityArgs {
  @ApiProperty({
    required: true,
    type: () => CommonFacilityCreateInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityCreateInput)
  @Field(() => CommonFacilityCreateInput, { nullable: false })
  data!: CommonFacilityCreateInput;
}

export { CreateCommonFacilityArgs as CreateCommonFacilityArgs };
