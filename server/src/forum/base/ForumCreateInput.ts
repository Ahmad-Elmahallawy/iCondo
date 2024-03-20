import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PostCreateNestedManyWithoutForumsInput } from "./PostCreateNestedManyWithoutForumsInput";

@InputType()
class ForumCreateInput {
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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: false,
    type: () => PostCreateNestedManyWithoutForumsInput,
  })
  @ValidateNested()
  @Type(() => PostCreateNestedManyWithoutForumsInput)
  @IsOptional()
  @Field(() => PostCreateNestedManyWithoutForumsInput, {
    nullable: true,
  })
  posts?: PostCreateNestedManyWithoutForumsInput;
}

export { ForumCreateInput as ForumCreateInput };
