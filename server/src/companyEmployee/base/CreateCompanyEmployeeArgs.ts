import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeCreateInput } from "./CompanyEmployeeCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateCompanyEmployeeArgs {
  @ApiProperty({
    required: true,
    type: () => CompanyEmployeeCreateInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeCreateInput)
  @Field(() => CompanyEmployeeCreateInput, { nullable: false })
  data!: CompanyEmployeeCreateInput;
}

export { CreateCompanyEmployeeArgs as CreateCompanyEmployeeArgs };
