import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumWhereInput } from "./ForumWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ForumListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => ForumWhereInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereInput)
  @IsOptional()
  @Field(() => ForumWhereInput, {
    nullable: true,
  })
  every?: ForumWhereInput;

  @ApiProperty({
    required: false,
    type: () => ForumWhereInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereInput)
  @IsOptional()
  @Field(() => ForumWhereInput, {
    nullable: true,
  })
  some?: ForumWhereInput;

  @ApiProperty({
    required: false,
    type: () => ForumWhereInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereInput)
  @IsOptional()
  @Field(() => ForumWhereInput, {
    nullable: true,
  })
  none?: ForumWhereInput;
}
export { ForumListRelationFilter as ForumListRelationFilter };
