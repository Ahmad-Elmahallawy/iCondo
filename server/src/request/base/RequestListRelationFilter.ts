import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RequestWhereInput } from "./RequestWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class RequestListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => RequestWhereInput,
  })
  @ValidateNested()
  @Type(() => RequestWhereInput)
  @IsOptional()
  @Field(() => RequestWhereInput, {
    nullable: true,
  })
  every?: RequestWhereInput;

  @ApiProperty({
    required: false,
    type: () => RequestWhereInput,
  })
  @ValidateNested()
  @Type(() => RequestWhereInput)
  @IsOptional()
  @Field(() => RequestWhereInput, {
    nullable: true,
  })
  some?: RequestWhereInput;

  @ApiProperty({
    required: false,
    type: () => RequestWhereInput,
  })
  @ValidateNested()
  @Type(() => RequestWhereInput)
  @IsOptional()
  @Field(() => RequestWhereInput, {
    nullable: true,
  })
  none?: RequestWhereInput;
}
export { RequestListRelationFilter as RequestListRelationFilter };
