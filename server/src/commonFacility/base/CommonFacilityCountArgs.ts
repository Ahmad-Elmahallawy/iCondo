import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommonFacilityWhereInput } from "./CommonFacilityWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class CommonFacilityCountArgs {
  @ApiProperty({
    required: false,
    type: () => CommonFacilityWhereInput,
  })
  @Field(() => CommonFacilityWhereInput, { nullable: true })
  @Type(() => CommonFacilityWhereInput)
  where?: CommonFacilityWhereInput;
}

export { CommonFacilityCountArgs as CommonFacilityCountArgs };
