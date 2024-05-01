import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationWhereInput } from "./NotificationWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { NotificationOrderByInput } from "./NotificationOrderByInput";

@ArgsType()
class NotificationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => NotificationWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => NotificationWhereInput, { nullable: true })
  @Type(() => NotificationWhereInput)
  where?: NotificationWhereInput;

  @ApiProperty({
    required: false,
    type: [NotificationOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [NotificationOrderByInput], { nullable: true })
  @Type(() => NotificationOrderByInput)
  orderBy?: Array<NotificationOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { NotificationFindManyArgs as NotificationFindManyArgs };
