import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Transform } from "class-transformer";

@InputType()
class UserCondoWhereUniqueInput {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Transform((prop) => parseInt(prop.value), {
    toClassOnly: true,
  })
  @Field(() => Number)
  id!: number;
}

export { UserCondoWhereUniqueInput as UserCondoWhereUniqueInput };
