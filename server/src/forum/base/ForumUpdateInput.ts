import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PostUpdateManyWithoutForumsInput } from "./PostUpdateManyWithoutForumsInput";

@InputType()
class ForumUpdateInput {
  @ApiProperty({
    required: false,
    type: () => CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @IsOptional()
  @Field(() => CompanyWhereUniqueInput, {
    nullable: true,
  })
  company?: CompanyWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    required: false,
    type: () => PostUpdateManyWithoutForumsInput,
  })
  @ValidateNested()
  @Type(() => PostUpdateManyWithoutForumsInput)
  @IsOptional()
  @Field(() => PostUpdateManyWithoutForumsInput, {
    nullable: true,
  })
  posts?: PostUpdateManyWithoutForumsInput;
}

export { ForumUpdateInput as ForumUpdateInput };
