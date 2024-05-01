import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeWhereUniqueInput } from "./CompanyEmployeeWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CompanyEmployeeUpdateInput } from "./CompanyEmployeeUpdateInput";

@ArgsType()
class UpdateCompanyEmployeeArgs {
  @ApiProperty({
    required: true,
    type: () => CompanyEmployeeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeWhereUniqueInput)
  @Field(() => CompanyEmployeeWhereUniqueInput, { nullable: false })
  where!: CompanyEmployeeWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CompanyEmployeeUpdateInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeUpdateInput)
  @Field(() => CompanyEmployeeUpdateInput, { nullable: false })
  data!: CompanyEmployeeUpdateInput;
}

export { UpdateCompanyEmployeeArgs as UpdateCompanyEmployeeArgs };
