import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FileCreateInput } from "./FileCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateFileArgs {
  @ApiProperty({
    required: true,
    type: () => FileCreateInput,
  })
  @ValidateNested()
  @Type(() => FileCreateInput)
  @Field(() => FileCreateInput, { nullable: false })
  data!: FileCreateInput;
}

export { CreateFileArgs as CreateFileArgs };
