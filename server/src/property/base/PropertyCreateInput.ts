import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested, IsOptional, IsInt } from "class-validator";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { Type } from "class-transformer";
import { FileCreateNestedManyWithoutPropertiesInput } from "./FileCreateNestedManyWithoutPropertiesInput";
import { LockerCreateNestedManyWithoutPropertiesInput } from "./LockerCreateNestedManyWithoutPropertiesInput";
import { ParkingSpotCreateNestedManyWithoutPropertiesInput } from "./ParkingSpotCreateNestedManyWithoutPropertiesInput";
import { CondoUnitCreateNestedManyWithoutPropertiesInput } from "./CondoUnitCreateNestedManyWithoutPropertiesInput";
import { RequestCreateNestedManyWithoutPropertiesInput } from "./RequestCreateNestedManyWithoutPropertiesInput";
import { CommonFacilityCreateNestedManyWithoutPropertiesInput } from "./CommonFacilityCreateNestedManyWithoutPropertiesInput";
@InputType()
class PropertyCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  address!: string;

  @ApiProperty({
    required: false,
    type: () => CondoUnitCreateNestedManyWithoutPropertiesInput,
  })
  @ValidateNested()
  @Type(() => CondoUnitCreateNestedManyWithoutPropertiesInput)
  @IsOptional()
  @Field(() => CondoUnitCreateNestedManyWithoutPropertiesInput, {
    nullable: true,
  })
  condoUnits?: CondoUnitCreateNestedManyWithoutPropertiesInput;

  @ApiProperty({
    required: false,
    type: () => FileCreateNestedManyWithoutPropertiesInput,
  })
  @ValidateNested()
  @Type(() => FileCreateNestedManyWithoutPropertiesInput)
  @IsOptional()
  @Field(() => FileCreateNestedManyWithoutPropertiesInput, {
    nullable: true,
  })
  files?: FileCreateNestedManyWithoutPropertiesInput;

  @ApiProperty({
    required: false,
    type: () => CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @IsOptional()
  @Field(() => CompanyWhereUniqueInput, {
    nullable: true,
  })
  company?: CompanyWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => CommonFacilityCreateNestedManyWithoutPropertiesInput,
  })
  @ValidateNested()
  @Type(() => CommonFacilityCreateNestedManyWithoutPropertiesInput)
  @IsOptional()
  @Field(() => CommonFacilityCreateNestedManyWithoutPropertiesInput, {
    nullable: true,
  })
  commonFacilities?: CommonFacilityCreateNestedManyWithoutPropertiesInput;
  
  @ApiProperty({
    required: false,
    type: () => RequestCreateNestedManyWithoutPropertiesInput,
  })
  @ValidateNested()
  @Type(() => RequestCreateNestedManyWithoutPropertiesInput)
  @IsOptional()
  @Field(() => RequestCreateNestedManyWithoutPropertiesInput, {
    nullable: true,
  })
  requests?: RequestCreateNestedManyWithoutPropertiesInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  lockerCount?: number | null;

  @ApiProperty({
    required: false,
    type: () => LockerCreateNestedManyWithoutPropertiesInput,
  })
  @ValidateNested()
  @Type(() => LockerCreateNestedManyWithoutPropertiesInput)
  @IsOptional()
  @Field(() => LockerCreateNestedManyWithoutPropertiesInput, {
    nullable: true,
  })
  Lockers?: LockerCreateNestedManyWithoutPropertiesInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  parkingCount!: number;

  @ApiProperty({
    required: false,
    type: () => ParkingSpotCreateNestedManyWithoutPropertiesInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotCreateNestedManyWithoutPropertiesInput)
  @IsOptional()
  @Field(() => ParkingSpotCreateNestedManyWithoutPropertiesInput, {
    nullable: true,
  })
  ParkingSpots?: ParkingSpotCreateNestedManyWithoutPropertiesInput;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  unitCount!: number;
}

export { PropertyCreateInput as PropertyCreateInput };
