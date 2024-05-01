import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import {ValidateNested, IsDate, IsInt, IsString, IsJSON} from "class-validator";
import { Type } from "class-transformer";
import {JsonValue} from "type-fest";
import {IsJSONValue} from "../../validators";
import {GraphQLJSON} from "graphql-type-json";

@ObjectType()
class RegistrationKey {
  @ApiProperty({
    required: true,
    type: () => CondoUnit,
  })
  @ValidateNested()
  @Type(() => CondoUnit)
  condoUnit?: CondoUnit;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: true,
  })
  @IsJSONValue()
  @Field(() => GraphQLJSON)
  role!: JsonValue;


  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  value!: string;
}

export { RegistrationKey as RegistrationKey };
