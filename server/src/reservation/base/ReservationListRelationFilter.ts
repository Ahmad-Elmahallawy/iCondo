import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationWhereInput } from "./ReservationWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ReservationListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => ReservationWhereInput,
  })
  @ValidateNested()
  @Type(() => ReservationWhereInput)
  @IsOptional()
  @Field(() => ReservationWhereInput, {
    nullable: true,
  })
  every?: ReservationWhereInput;

  @ApiProperty({
    required: false,
    type: () => ReservationWhereInput,
  })
  @ValidateNested()
  @Type(() => ReservationWhereInput)
  @IsOptional()
  @Field(() => ReservationWhereInput, {
    nullable: true,
  })
  some?: ReservationWhereInput;

  @ApiProperty({
    required: false,
    type: () => ReservationWhereInput,
  })
  @ValidateNested()
  @Type(() => ReservationWhereInput)
  @IsOptional()
  @Field(() => ReservationWhereInput, {
    nullable: true,
  })
  none?: ReservationWhereInput;
}
export { ReservationListRelationFilter as ReservationListRelationFilter };
