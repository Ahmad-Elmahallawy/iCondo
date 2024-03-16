import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RequestWhereUniqueInput } from "./RequestWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class DeleteRequestArgs {
  @ApiProperty({
    required: true,
    type: () => RequestWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RequestWhereUniqueInput)
  @Field(() => RequestWhereUniqueInput, { nullable: false })
  where!: RequestWhereUniqueInput;
}

export { DeleteRequestArgs as DeleteRequestArgs };
