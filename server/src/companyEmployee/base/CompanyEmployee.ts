import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Company } from "../../company/base/Company";
import { ValidateNested, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { User } from "../../user/base/User";
import { RequestObject } from "../../request/base/Request";
@ObjectType()
class CompanyEmployee {
  @ApiProperty({
    required: false,
    type: () => Company,
  })
  @ValidateNested()
  @Type(() => Company)
  @IsOptional()
  company?: Company | null;

  @ApiProperty({
    required: false,
    type: () => [RequestObject],
  })
  @ValidateNested()
  @Type(() => RequestObject)
  @IsOptional()
  requests?: Array<RequestObject>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  @IsOptional()
  user?: User | null;
}

export { CompanyEmployee as CompanyEmployee };
