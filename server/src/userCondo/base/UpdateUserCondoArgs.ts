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
import { UserCondoWhereUniqueInput } from "./UserCondoWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UserCondoUpdateInput } from "./UserCondoUpdateInput";

@ArgsType()
class UpdateUserCondoArgs {
  @ApiProperty({
    required: true,
    type: () => UserCondoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserCondoWhereUniqueInput)
  @Field(() => UserCondoWhereUniqueInput, { nullable: false })
  where!: UserCondoWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => UserCondoUpdateInput,
  })
  @ValidateNested()
  @Type(() => UserCondoUpdateInput)
  @Field(() => UserCondoUpdateInput, { nullable: false })
  data!: UserCondoUpdateInput;
}

export { UpdateUserCondoArgs as UpdateUserCondoArgs };