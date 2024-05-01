import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RoleWhereInput } from "./RoleWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { RoleOrderByInput } from "./RoleOrderByInput";

@ArgsType()
class RoleFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => RoleWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => RoleWhereInput, { nullable: true })
  @Type(() => RoleWhereInput)
  where?: RoleWhereInput;

  @ApiProperty({
    required: false,
    type: [RoleOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [RoleOrderByInput], { nullable: true })
  @Type(() => RoleOrderByInput)
  orderBy?: Array<RoleOrderByInput>;

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

export { RoleFindManyArgs as RoleFindManyArgs };
