import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeWhereUniqueInput } from "./CompanyEmployeeWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class DeleteCompanyEmployeeArgs {
  @ApiProperty({
    required: true,
    type: () => CompanyEmployeeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeWhereUniqueInput)
  @Field(() => CompanyEmployeeWhereUniqueInput, { nullable: false })
  where!: CompanyEmployeeWhereUniqueInput;
}

export { DeleteCompanyEmployeeArgs as DeleteCompanyEmployeeArgs };
