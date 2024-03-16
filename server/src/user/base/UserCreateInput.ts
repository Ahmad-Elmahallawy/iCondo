import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeCreateNestedManyWithoutUsersInput } from "./CompanyEmployeeCreateNestedManyWithoutUsersInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { FileCreateNestedManyWithoutUsersInput } from "./FileCreateNestedManyWithoutUsersInput";
import { PostCreateNestedManyWithoutUsersInput } from "./PostCreateNestedManyWithoutUsersInput";
import { RequestCreateNestedManyWithoutUsersInput } from "./RequestCreateNestedManyWithoutUsersInput";
import { ReservationCreateNestedManyWithoutUsersInput } from "./ReservationCreateNestedManyWithoutUsersInput";
import { IsJSONValue } from "../../validators";
import { GraphQLJSON } from "graphql-type-json";
import { InputJsonValue } from "../../types";
import { UserCondoCreateNestedManyWithoutUsersInput } from "./UserCondoCreateNestedManyWithoutUsersInput";

@InputType()
class UserCreateInput {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => CompanyEmployeeCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  companyEmployees?: CompanyEmployeeCreateNestedManyWithoutUsersInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  email!: string;

  @ApiProperty({
    required: false,
    type: () => FileCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => FileCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => FileCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  files?: FileCreateNestedManyWithoutUsersInput;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  password!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  phoneNumber!: string;

  @ApiProperty({
    required: true,
  })
  @IsJSONValue()
  @Field(() => GraphQLJSON)
  roles!: InputJsonValue;


  @ApiProperty({
    required: false,
    type: () => PostCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => PostCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => PostCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  posts?: PostCreateNestedManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: () => RequestCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => RequestCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => RequestCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  requests?: RequestCreateNestedManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: () => ReservationCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => ReservationCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => ReservationCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  reservations?: ReservationCreateNestedManyWithoutUsersInput;

  @ApiProperty({
    required: false,
    type: () => UserCondoCreateNestedManyWithoutUsersInput,
  })
  @ValidateNested()
  @Type(() => UserCondoCreateNestedManyWithoutUsersInput)
  @IsOptional()
  @Field(() => UserCondoCreateNestedManyWithoutUsersInput, {
    nullable: true,
  })
  userCondos?: UserCondoCreateNestedManyWithoutUsersInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  username!: string;
}

export { UserCreateInput as UserCreateInput };
