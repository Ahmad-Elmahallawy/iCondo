import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationKeyWhereInput } from "./RegistrationKeyWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { RegistrationKeyOrderByInput } from "./RegistrationKeyOrderByInput";

@ArgsType()
class RegistrationKeyFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => RegistrationKeyWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => RegistrationKeyWhereInput, { nullable: true })
  @Type(() => RegistrationKeyWhereInput)
  where?: RegistrationKeyWhereInput;

  @ApiProperty({
    required: false,
    type: [RegistrationKeyOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [RegistrationKeyOrderByInput], { nullable: true })
  @Type(() => RegistrationKeyOrderByInput)
  orderBy?: Array<RegistrationKeyOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { RegistrationKeyFindManyArgs as RegistrationKeyFindManyArgs };
