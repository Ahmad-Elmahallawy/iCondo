import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeUpdateManyWithoutUsersInput } from "./CompanyEmployeeUpdateManyWithoutUsersInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { FileUpdateManyWithoutUsersInput } from "./FileUpdateManyWithoutUsersInput";
import { IsJSONValue } from "../../validators";
import { GraphQLJSON } from "graphql-type-json";
import { InputJsonValue } from "../../types";
import { UserCondoUpdateManyWithoutUsersInput } from "./UserCondoUpdateManyWithoutUsersInput";
import { PostUpdateManyWithoutUsersInput } from "./PostUpdateManyWithoutUsersInput";
import { RequestUpdateManyWithoutUsersInput } from "./RequestUpdateManyWithoutUsersInput";
import { ReservationUpdateManyWithoutUsersInput } from "./ReservationUpdateManyWithoutUsersInput";
import { NotificationUpdateManyWithoutUsersInput } from "./NotificationUpdateManyWithoutUsersInput";
@InputType()
class UserUpdateInput {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => CompanyEmployeeUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  companyEmployees?: CompanyEmployeeUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email?: string;

  @ApiProperty({
    required: false,
    type: () => NotificationUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => NotificationUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => NotificationUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  notifications?: NotificationUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: () => FileUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => FileUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => FileUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  files?: FileUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  password?: string;

  @ApiProperty({
    required: false,
    type: () => PostUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => PostUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => PostUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  posts?: PostUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: () => RequestUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => RequestUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => RequestUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  requests?: RequestUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: () => ReservationUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => ReservationUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => ReservationUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  reservations?: ReservationUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  phoneNumber?: string;

  @ApiProperty({
    required: false,
  })
  @IsJSONValue()
  @IsOptional()
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  roles?: InputJsonValue;

  @ApiProperty({
    required: false,
    type: () => UserCondoUpdateManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => UserCondoUpdateManyWithoutUsersInput)
  @IsOptional()
  @Field(() => UserCondoUpdateManyWithoutUsersInput, {
    nullable: true,
  })
  userCondos?: UserCondoUpdateManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  username?: string;
}

export { UserUpdateInput as UserUpdateInput };
