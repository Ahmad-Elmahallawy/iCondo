import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyWhereInput } from "./CompanyWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class CompanyCountArgs {
  @ApiProperty({
    required: false,
    type: () => CompanyWhereInput,
  })
  @Field(() => CompanyWhereInput, { nullable: true })
  @Type(() => CompanyWhereInput)
  where?: CompanyWhereInput;
}

export { CompanyCountArgs as CompanyCountArgs };
