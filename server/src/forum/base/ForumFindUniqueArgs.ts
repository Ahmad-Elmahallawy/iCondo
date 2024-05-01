import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumWhereUniqueInput } from "./ForumWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class ForumFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => ForumWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereUniqueInput)
  @Field(() => ForumWhereUniqueInput, { nullable: false })
  where!: ForumWhereUniqueInput;
}

export { ForumFindUniqueArgs as ForumFindUniqueArgs };
