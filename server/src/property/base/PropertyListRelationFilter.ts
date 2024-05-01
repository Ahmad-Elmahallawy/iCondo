import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PropertyWhereInput } from "./PropertyWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class PropertyListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => PropertyWhereInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereInput)
  @IsOptional()
  @Field(() => PropertyWhereInput, {
    nullable: true,
  })
  every?: PropertyWhereInput;

  @ApiProperty({
    required: false,
    type: () => PropertyWhereInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereInput)
  @IsOptional()
  @Field(() => PropertyWhereInput, {
    nullable: true,
  })
  some?: PropertyWhereInput;

  @ApiProperty({
    required: false,
    type: () => PropertyWhereInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereInput)
  @IsOptional()
  @Field(() => PropertyWhereInput, {
    nullable: true,
  })
  none?: PropertyWhereInput;
}
export { PropertyListRelationFilter as PropertyListRelationFilter };
