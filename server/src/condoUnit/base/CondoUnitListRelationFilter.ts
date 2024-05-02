import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereInput } from "./CondoUnitWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class CondoUnitListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => CondoUnitWhereInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereInput)
  @IsOptional()
  @Field(() => CondoUnitWhereInput, {
    nullable: true,
  })
  every?: CondoUnitWhereInput;

  @ApiProperty({
    required: false,
    type: () => CondoUnitWhereInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereInput)
  @IsOptional()
  @Field(() => CondoUnitWhereInput, {
    nullable: true,
  })
  some?: CondoUnitWhereInput;

  @ApiProperty({
    required: false,
    type: () => CondoUnitWhereInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitWhereInput)
  @IsOptional()
  @Field(() => CondoUnitWhereInput, {
    nullable: true,
  })
  none?: CondoUnitWhereInput;
}
export { CondoUnitListRelationFilter as CondoUnitListRelationFilter };
