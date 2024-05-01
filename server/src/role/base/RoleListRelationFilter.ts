import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RoleWhereInput } from "./RoleWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class RoleListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => RoleWhereInput,
  })
  @ValidateNested()
  @Type(() => RoleWhereInput)
  @IsOptional()
  @Field(() => RoleWhereInput, {
    nullable: true,
  })
  every?: RoleWhereInput;

  @ApiProperty({
    required: false,
    type: () => RoleWhereInput,
  })
  @ValidateNested()
  @Type(() => RoleWhereInput)
  @IsOptional()
  @Field(() => RoleWhereInput, {
    nullable: true,
  })
  some?: RoleWhereInput;

  @ApiProperty({
    required: false,
    type: () => RoleWhereInput,
  })
  @ValidateNested()
  @Type(() => RoleWhereInput)
  @IsOptional()
  @Field(() => RoleWhereInput, {
    nullable: true,
  })
  none?: RoleWhereInput;
}
export { RoleListRelationFilter as RoleListRelationFilter };
