import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FileWhereUniqueInput } from "./FileWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class FileFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => FileWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FileWhereUniqueInput)
  @Field(() => FileWhereUniqueInput, { nullable: false })
  where!: FileWhereUniqueInput;
}

export { FileFindUniqueArgs as FileFindUniqueArgs };
