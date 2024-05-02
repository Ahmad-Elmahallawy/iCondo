import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeWhereInput } from "./CompanyEmployeeWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class CompanyEmployeeCountArgs {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeWhereInput,
  })
  @Field(() => CompanyEmployeeWhereInput, { nullable: true })
  @Type(() => CompanyEmployeeWhereInput)
  where?: CompanyEmployeeWhereInput;
}

export { CompanyEmployeeCountArgs as CompanyEmployeeCountArgs };
