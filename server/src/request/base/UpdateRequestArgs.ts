import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RequestWhereUniqueInput } from "./RequestWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RequestUpdateInput } from "./RequestUpdateInput";

@ArgsType()
class UpdateRequestArgs {
  @ApiProperty({
    required: true,
    type: () => RequestWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RequestWhereUniqueInput)
  @Field(() => RequestWhereUniqueInput, { nullable: false })
  where!: RequestWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => RequestUpdateInput,
  })
  @ValidateNested()
  @Type(() => RequestUpdateInput)
  @Field(() => RequestUpdateInput, { nullable: false })
  data!: RequestUpdateInput;
}

export { UpdateRequestArgs as UpdateRequestArgs };
