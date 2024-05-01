import { InputType, Field } from "@nestjs/graphql";
import { FileWhereUniqueInput } from "../../file/base/FileWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class FileCreateNestedManyWithoutCompaniesInput {
  @Field(() => [FileWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FileWhereUniqueInput],
  })
  connect?: Array<FileWhereUniqueInput>;
}

export { FileCreateNestedManyWithoutCompaniesInput as FileCreateNestedManyWithoutCompaniesInput };
