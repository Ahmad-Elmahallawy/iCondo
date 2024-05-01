import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyCreateInput } from "./CompanyCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateCompanyArgs {
  @ApiProperty({
    required: true,
    type: () => CompanyCreateInput,
  })
  @ValidateNested()
  @Type(() => CompanyCreateInput)
  @Field(() => CompanyCreateInput, { nullable: false })
  data!: CompanyCreateInput;
}

export { CreateCompanyArgs as CreateCompanyArgs };
