import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LockerWhereInput } from "./LockerWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class LockerListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => LockerWhereInput,
  })
  @ValidateNested()
  @Type(() => LockerWhereInput)
  @IsOptional()
  @Field(() => LockerWhereInput, {
    nullable: true,
  })
  every?: LockerWhereInput;

  @ApiProperty({
    required: false,
    type: () => LockerWhereInput,
  })
  @ValidateNested()
  @Type(() => LockerWhereInput)
  @IsOptional()
  @Field(() => LockerWhereInput, {
    nullable: true,
  })
  some?: LockerWhereInput;

  @ApiProperty({
    required: false,
    type: () => LockerWhereInput,
  })
  @ValidateNested()
  @Type(() => LockerWhereInput)
  @IsOptional()
  @Field(() => LockerWhereInput, {
    nullable: true,
  })
  none?: LockerWhereInput;
}
export { LockerListRelationFilter as LockerListRelationFilter };
