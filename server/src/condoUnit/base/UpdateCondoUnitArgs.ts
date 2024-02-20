/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereUniqueInput } from "./CondoUnitWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CondoUnitUpdateInput } from "./CondoUnitUpdateInput";

@ArgsType()
class UpdateCondoUnitArgs {
  @ApiProperty({
    required: true,
    type: () => CondoUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereUniqueInput)
  @Field(() => CondoUnitWhereUniqueInput, { nullable: false })
  where!: CondoUnitWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CondoUnitUpdateInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitUpdateInput)
  @Field(() => CondoUnitUpdateInput, { nullable: false })
  data!: CondoUnitUpdateInput;
}

export { UpdateCondoUnitArgs as UpdateCondoUnitArgs };