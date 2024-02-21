/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class RegistrationKeyCreateInput {
  @ApiProperty({
    required: true,
    type: () => CondoUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereUniqueInput)
  @Field(() => CondoUnitWhereUniqueInput)
  condoUnit!: CondoUnitWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  value!: string;
}

export { RegistrationKeyCreateInput as RegistrationKeyCreateInput };
