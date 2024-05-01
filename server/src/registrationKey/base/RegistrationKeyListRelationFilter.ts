import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyWhereInput } from "./RegistrationKeyWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class RegistrationKeyListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => RegistrationKeyWhereInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereInput)
  @IsOptional()
  @Field(() => RegistrationKeyWhereInput, {
    nullable: true,
  })
  every?: RegistrationKeyWhereInput;

  @ApiProperty({
    required: false,
    type: () => RegistrationKeyWhereInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereInput)
  @IsOptional()
  @Field(() => RegistrationKeyWhereInput, {
    nullable: true,
  })
  some?: RegistrationKeyWhereInput;

  @ApiProperty({
    required: false,
    type: () => RegistrationKeyWhereInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereInput)
  @IsOptional()
  @Field(() => RegistrationKeyWhereInput, {
    nullable: true,
  })
  none?: RegistrationKeyWhereInput;
}
export { RegistrationKeyListRelationFilter as RegistrationKeyListRelationFilter };
