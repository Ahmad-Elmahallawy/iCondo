import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CostWhereInput } from "./CostWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { CostOrderByInput } from "./CostOrderByInput";

@ArgsType()
class CostFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CostWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => CostWhereInput, { nullable: true })
  @Type(() => CostWhereInput)
  where?: CostWhereInput;

  @ApiProperty({
    required: false,
    type: [CostOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [CostOrderByInput], { nullable: true })
  @Type(() => CostOrderByInput)
  orderBy?: Array<CostOrderByInput>;

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

export { CostFindManyArgs as CostFindManyArgs };