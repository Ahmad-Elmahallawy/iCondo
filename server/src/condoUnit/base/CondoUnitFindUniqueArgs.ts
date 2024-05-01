import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereUniqueInput } from "./CondoUnitWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CondoUnitFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => CondoUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereUniqueInput)
  @Field(() => CondoUnitWhereUniqueInput, { nullable: false })
  where!: CondoUnitWhereUniqueInput;
}

export { CondoUnitFindUniqueArgs as CondoUnitFindUniqueArgs };
