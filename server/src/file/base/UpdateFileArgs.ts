import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FileWhereUniqueInput } from "./FileWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { FileUpdateInput } from "./FileUpdateInput";

@ArgsType()
class UpdateFileArgs {
  @ApiProperty({
    required: true,
    type: () => FileWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FileWhereUniqueInput)
  @Field(() => FileWhereUniqueInput, { nullable: false })
  where!: FileWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => FileUpdateInput,
  })
  @ValidateNested()
  @Type(() => FileUpdateInput)
  @Field(() => FileUpdateInput, { nullable: false })
  data!: FileUpdateInput;
}

export { UpdateFileArgs as UpdateFileArgs };
