import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DecimalNullableFilter } from "../../util/DecimalNullableFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { FileListRelationFilter } from "../../file/base/FileListRelationFilter";
import { IntFilter } from "../../util/IntFilter";
import { LockerWhereUniqueInput } from "../../locker/base/LockerWhereUniqueInput";
import { ParkingSpotListRelationFilter } from "../../parkingSpot/base/ParkingSpotListRelationFilter";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { RegistrationKeyWhereUniqueInput } from "../../registrationKey/base/RegistrationKeyWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { UserCondoListRelationFilter } from "../../userCondo/base/UserCondoListRelationFilter";
import {StringNullableFilter} from "../../util/StringNullableFilter";
import { RequestListRelationFilter } from "../../request/base/RequestListRelationFilter";
@InputType()
class CondoUnitWhereInput {
  @ApiProperty({
    required: false,
    type: DecimalNullableFilter,
  })
  @Type(() => DecimalNullableFilter)
  @IsOptional()
  @Field(() => DecimalNullableFilter, {
    nullable: true,
  })
  condoFee?: DecimalNullableFilter;

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
  file?: FileListRelationFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  unitNumber?: StringNullableFilter;

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
    type: () => LockerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => LockerWhereUniqueInput)
  @IsOptional()
  @Field(() => LockerWhereUniqueInput, {
    nullable: true,
  })
  locker?: LockerWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => ParkingSpotListRelationFilter,
  })
  @ValidateNested()
  @Type(() => ParkingSpotListRelationFilter)
  @IsOptional()
  @Field(() => ParkingSpotListRelationFilter, {
    nullable: true,
  })
  parkingSpot?: ParkingSpotListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => PropertyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PropertyWhereUniqueInput)
  @IsOptional()
  @Field(() => PropertyWhereUniqueInput, {
    nullable: true,
  })
  propertyID?: PropertyWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => RegistrationKeyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => RegistrationKeyWhereUniqueInput)
  @IsOptional()
  @Field(() => RegistrationKeyWhereUniqueInput, {
    nullable: true,
  })
  registrationKeys?: RegistrationKeyWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  size?: StringFilter;

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
    type: () => RequestListRelationFilter,
  })
  @ValidateNested()
  @Type(() => RequestListRelationFilter)
  @IsOptional()
  @Field(() => RequestListRelationFilter, {
    nullable: true,
  })
  requests?: RequestListRelationFilter;
}

export { CondoUnitWhereInput as CondoUnitWhereInput };
