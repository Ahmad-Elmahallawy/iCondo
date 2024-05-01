import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationWhereInput } from "./NotificationWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class NotificationListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => NotificationWhereInput,
  })
  @ValidateNested()
  @Type(() => NotificationWhereInput)
  @IsOptional()
  @Field(() => NotificationWhereInput, {
    nullable: true,
  })
  every?: NotificationWhereInput;

  @ApiProperty({
    required: false,
    type: () => NotificationWhereInput,
  })
  @ValidateNested()
  @Type(() => NotificationWhereInput)
  @IsOptional()
  @Field(() => NotificationWhereInput, {
    nullable: true,
  })
  some?: NotificationWhereInput;

  @ApiProperty({
    required: false,
    type: () => NotificationWhereInput,
  })
  @ValidateNested()
  @Type(() => NotificationWhereInput)
  @IsOptional()
  @Field(() => NotificationWhereInput, {
    nullable: true,
  })
  none?: NotificationWhereInput;
}
export { NotificationListRelationFilter as NotificationListRelationFilter };
