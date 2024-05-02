import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import {GraphQLJSON} from "graphql-type-json";
import {InputJsonValue} from "../../types";

@InputType()
class RegistrationKeyUpdateInput {
  @ApiProperty({
    required: false,
    type: () => CondoUnitWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereUniqueInput)
  @IsOptional()
  @Field(() => CondoUnitWhereUniqueInput, {
    nullable: true,
  })
  condoUnit?: CondoUnitWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  value?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  role?: InputJsonValue;
}

export { RegistrationKeyUpdateInput as RegistrationKeyUpdateInput };
