import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Transform } from "class-transformer";

@InputType()
class CostWhereUniqueInput {
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

export { CostWhereUniqueInput as CostWhereUniqueInput };