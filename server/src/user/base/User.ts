import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployee } from "../../companyEmployee/base/CompanyEmployee";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsString,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";
import { Post } from "../../post/base/Post";
import { RequestObject } from "../../request/base/Request";
import { Reservation } from "../../reservation/base/Reservation";
import { File } from "../../file/base/File";
import { IsJSONValue } from "../../validators";
import { GraphQLJSON } from "graphql-type-json";
import { JsonValue } from "type-fest";
import { UserCondo } from "../../userCondo/base/UserCondo";
import { Notification } from "../../notification/base/Notification";
@ObjectType()
class User {
  @ApiProperty({
    required: false,
    type: () => [CompanyEmployee],
  })
  @ValidateNested()
  @Type(() => CompanyEmployee)
  @IsOptional()
  companyEmployees?: Array<CompanyEmployee>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  email!: string;

  @ApiProperty({
    required: false,
    type: () => [File],
  })
  @ValidateNested()
  @Type(() => File)
  @IsOptional()
  files?: Array<File>;

  @ApiProperty({
    required: false,
    type: () => [Notification],
  })
  @ValidateNested()
  @Type(() => Notification)
  @IsOptional()
  notifications?: Array<Notification>;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstName!: string | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  phoneNumber!: string;

  @ApiProperty({
    required: false,
    type: () => [Post],
  })
  @ValidateNested()
  @Type(() => Post)
  @IsOptional()
  posts?: Array<Post>;

  @ApiProperty({
    required: false,
    type: () => [Request],
  })
  @ValidateNested()
  @Type(() => Request)
  @IsOptional()
  requests?: Array<Request>;

  @ApiProperty({
    required: false,
    type: () => [Reservation],
  })
  @ValidateNested()
  @Type(() => Reservation)
  @IsOptional()
  reservations?: Array<Reservation>;

  @ApiProperty({
    required: true,
  })
  @IsJSONValue()
  @Field(() => GraphQLJSON)
  roles!: JsonValue;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: () => [UserCondo],
  })
  @ValidateNested()
  @Type(() => UserCondo)
  @IsOptional()
  userCondos?: Array<UserCondo>;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  username!: string;
}

export { User as User };
