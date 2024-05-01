import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FileWhereInput } from "./FileWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class FileCountArgs {
  @ApiProperty({
    required: false,
    type: () => FileWhereInput,
  })
  @Field(() => FileWhereInput, { nullable: true })
  @Type(() => FileWhereInput)
  where?: FileWhereInput;
}

export { FileCountArgs as FileCountArgs };
