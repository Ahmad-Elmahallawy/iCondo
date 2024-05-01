import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereUniqueInput } from "../../condoUnit/base/CondoUnitWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import {JsonValue} from "type-fest";
import {InputJsonValue} from "../../types";
import {GraphQLJSON} from "graphql-type-json";
import {IsJSONValue} from "../../validators";

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

  @ApiProperty({
    required: true,
  })
  @IsJSONValue()
  @Field(() => GraphQLJSON)
  role!: InputJsonValue;
}

export { RegistrationKeyCreateInput as RegistrationKeyCreateInput };
