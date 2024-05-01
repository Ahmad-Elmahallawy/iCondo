import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereUniqueInput } from "./CompanyWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CompanyFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @Field(() => CompanyWhereUniqueInput, { nullable: false })
  where!: CompanyWhereUniqueInput;
}

export { CompanyFindUniqueArgs as CompanyFindUniqueArgs };
