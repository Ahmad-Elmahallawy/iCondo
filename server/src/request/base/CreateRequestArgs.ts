import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RequestCreateInput } from "./RequestCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateRequestArgs {
  @ApiProperty({
    required: true,
    type: () => RequestCreateInput,
  })
  @ValidateNested()
  @Type(() => RequestCreateInput)
  @Field(() => RequestCreateInput, { nullable: false })
  data!: RequestCreateInput;
}

export { CreateRequestArgs as CreateRequestArgs };
