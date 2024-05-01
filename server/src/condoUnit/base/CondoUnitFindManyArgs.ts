import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnitWhereInput } from "./CondoUnitWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { CondoUnitOrderByInput } from "./CondoUnitOrderByInput";

@ArgsType()
class CondoUnitFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CondoUnitWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => CondoUnitWhereInput, { nullable: true })
  @Type(() => CondoUnitWhereInput)
  where?: CondoUnitWhereInput;

  @ApiProperty({
    required: false,
    type: [CondoUnitOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [CondoUnitOrderByInput], { nullable: true })
  @Type(() => CondoUnitOrderByInput)
  orderBy?: Array<CondoUnitOrderByInput>;

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

export { CondoUnitFindManyArgs as CondoUnitFindManyArgs };
