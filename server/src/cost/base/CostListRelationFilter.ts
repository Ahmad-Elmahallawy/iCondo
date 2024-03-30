import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CostWhereInput } from "./CostWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class CostListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => CostWhereInput,
  })
  @ValidateNested()
  @Type(() => CostWhereInput)
  @IsOptional()
  @Field(() => CostWhereInput, {
    nullable: true,
  })
  every?: CostWhereInput;

  @ApiProperty({
    required: false,
    type: () => CostWhereInput,
  })
  @ValidateNested()
  @Type(() => CostWhereInput)
  @IsOptional()
  @Field(() => CostWhereInput, {
    nullable: true,
  })
  some?: CostWhereInput;

  @ApiProperty({
    required: false,
    type: () => CostWhereInput,
  })
  @ValidateNested()
  @Type(() => CostWhereInput)
  @IsOptional()
  @Field(() => CostWhereInput, {
    nullable: true,
  })
  none?: CostWhereInput;
}
export { CostListRelationFilter as CostListRelationFilter };
