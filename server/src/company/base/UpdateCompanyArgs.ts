import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "./CompanyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CompanyUpdateInput } from "./CompanyUpdateInput";

@ArgsType()
class UpdateCompanyArgs {
  @ApiProperty({
    required: true,
    type: () => CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @Field(() => CompanyWhereUniqueInput, { nullable: false })
  where!: CompanyWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CompanyUpdateInput,
  })
  @ValidateNested()
  @Type(() => CompanyUpdateInput)
  @Field(() => CompanyUpdateInput, { nullable: false })
  data!: CompanyUpdateInput;
}

export { UpdateCompanyArgs as UpdateCompanyArgs };
