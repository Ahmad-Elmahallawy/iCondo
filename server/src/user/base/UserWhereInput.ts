import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeListRelationFilter } from "../../companyEmployee/base/CompanyEmployeeListRelationFilter";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { StringFilter } from "../../util/StringFilter";
import { FileListRelationFilter } from "../../file/base/FileListRelationFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { IntFilter } from "../../util/IntFilter";
import { UserCondoListRelationFilter } from "../../userCondo/base/UserCondoListRelationFilter";
import { PostListRelationFilter } from "../../post/base/PostListRelationFilter";
import { RequestListRelationFilter } from "../../request/base/RequestListRelationFilter";
import { ReservationListRelationFilter } from "../../reservation/base/ReservationListRelationFilter";
import { NotificationListRelationFilter } from "../../notification/base/NotificationListRelationFilter";
@InputType()
class UserWhereInput {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeListRelationFilter,
  })
  @ValidateNested()
  @Type(() => CompanyEmployeeListRelationFilter)
  @IsOptional()
  @Field(() => CompanyEmployeeListRelationFilter, {
    nullable: true,
  })
  companyEmployees?: CompanyEmployeeListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => NotificationListRelationFilter,
  })
  @ValidateNested()
  @Type(() => NotificationListRelationFilter)
  @IsOptional()
  @Field(() => NotificationListRelationFilter, {
    nullable: true,
  })
  notifications?: NotificationListRelationFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  email?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => FileListRelationFilter,
  })
  @ValidateNested()
  @Type(() => FileListRelationFilter)
  @IsOptional()
  @Field(() => FileListRelationFilter, {
    nullable: true,
  })
  files?: FileListRelationFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  firstName?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  id?: IntFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  lastName?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  phoneNumber?: StringFilter;


  @ApiProperty({
    required: false,
    type: () => PostListRelationFilter,
  })
  @ValidateNested()
  @Type(() => PostListRelationFilter)
  @IsOptional()
  @Field(() => PostListRelationFilter, {
    nullable: true,
  })
  posts?: PostListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => RequestListRelationFilter,
  })
  @ValidateNested()
  @Type(() => RequestListRelationFilter)
  @IsOptional()
  @Field(() => RequestListRelationFilter, {
    nullable: true,
  })
  requests?: RequestListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => ReservationListRelationFilter,
  })
  @ValidateNested()
  @Type(() => ReservationListRelationFilter)
  @IsOptional()
  @Field(() => ReservationListRelationFilter, {
    nullable: true,
  })
  reservations?: ReservationListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => UserCondoListRelationFilter,
  })
  @ValidateNested()
  @Type(() => UserCondoListRelationFilter)
  @IsOptional()
  @Field(() => UserCondoListRelationFilter, {
    nullable: true,
  })
  userCondos?: UserCondoListRelationFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  username?: StringFilter;
}

export { UserWhereInput as UserWhereInput };
