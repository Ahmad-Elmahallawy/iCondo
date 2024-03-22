import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { ValidateNested, IsOptional, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { User } from "../../user/base/User";

@ObjectType()
class UserCondo {
  @ApiProperty({
    required: false,
    type: () => CondoUnit,
  })
  @ValidateNested()
  @Type(() => CondoUnit)
  @IsOptional()
  condo?: CondoUnit | null;

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
    required: false,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  @IsOptional()
  user?: User | null;
}

export { UserCondo as UserCondo };
