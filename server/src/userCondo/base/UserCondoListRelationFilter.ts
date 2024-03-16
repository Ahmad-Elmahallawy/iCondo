import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCondoWhereInput } from "./UserCondoWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class UserCondoListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => UserCondoWhereInput,
  })
  @ValidateNested()
  @Type(() => UserCondoWhereInput)
  @IsOptional()
  @Field(() => UserCondoWhereInput, {
    nullable: true,
  })
  every?: UserCondoWhereInput;

  @ApiProperty({
    required: false,
    type: () => UserCondoWhereInput,
  })
  @ValidateNested()
  @Type(() => UserCondoWhereInput)
  @IsOptional()
  @Field(() => UserCondoWhereInput, {
    nullable: true,
  })
  some?: UserCondoWhereInput;

  @ApiProperty({
    required: false,
    type: () => UserCondoWhereInput,
  })
  @ValidateNested()
  @Type(() => UserCondoWhereInput)
  @IsOptional()
  @Field(() => UserCondoWhereInput, {
    nullable: true,
  })
  none?: UserCondoWhereInput;
}
export { UserCondoListRelationFilter as UserCondoListRelationFilter };
