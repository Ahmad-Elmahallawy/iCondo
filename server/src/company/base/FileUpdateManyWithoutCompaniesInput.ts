import { InputType, Field } from "@nestjs/graphql";
import { FileWhereUniqueInput } from "../../file/base/FileWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class FileUpdateManyWithoutCompaniesInput {
  @Field(() => [FileWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FileWhereUniqueInput],
  })
  connect?: Array<FileWhereUniqueInput>;

  @Field(() => [FileWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FileWhereUniqueInput],
  })
  disconnect?: Array<FileWhereUniqueInput>;

  @Field(() => [FileWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [FileWhereUniqueInput],
  })
  set?: Array<FileWhereUniqueInput>;
}

export { FileUpdateManyWithoutCompaniesInput as FileUpdateManyWithoutCompaniesInput };
