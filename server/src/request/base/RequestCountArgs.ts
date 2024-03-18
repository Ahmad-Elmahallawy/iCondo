import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RequestWhereInput } from "./RequestWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class RequestCountArgs {
  @ApiProperty({
    required: false,
    type: () => RequestWhereInput,
  })
  @Field(() => RequestWhereInput, { nullable: true })
  @Type(() => RequestWhereInput)
  where?: RequestWhereInput;
}

export { RequestCountArgs as RequestCountArgs };
