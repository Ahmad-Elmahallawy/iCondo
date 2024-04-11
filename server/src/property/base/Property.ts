import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  ValidateNested,
  IsOptional,
  IsDate,
  IsInt,
} from "class-validator";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { Type } from "class-transformer";
import { File } from "../../file/base/File";
import { Locker } from "../../locker/base/Locker";
import { ParkingSpot } from "../../parkingSpot/base/ParkingSpot";
import { Company } from "../../company/base/Company";
import { RequestObject } from "../../request/base/Request";
import { CommonFacility } from "../../commonFacility/base/CommonFacility";
@ObjectType()
class Property {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  address!: string;

  @ApiProperty({
    required: false,
    type: () => [CondoUnit],
  })
  @ValidateNested()
  @Type(() => CondoUnit)
  @IsOptional()
  condoUnits?: Array<CondoUnit>;

  @ApiProperty({
    required: false,
    type: () => Company,
  })
  @ValidateNested()
  @Type(() => Company)
  @IsOptional()
  company?: Company | null;

  @ApiProperty({
    required: false,
    type: () => [RequestObject],
  })
  @ValidateNested()
  @Type(() => RequestObject)
  @IsOptional()
  requests?: Array<RequestObject>;

  @ApiProperty({
    required: false,
    type: () => [CommonFacility],
  })
  @ValidateNested()
  @Type(() => CommonFacility)
  @IsOptional()
  commonFacilities?: Array<CommonFacility>;
  
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: () => [File],
  })
  @ValidateNested()
  @Type(() => File)
  @IsOptional()
  files?: Array<File>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  id!: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  lockerCount!: number | null;

  @ApiProperty({
    required: false,
    type: () => [Locker],
  })
  @ValidateNested()
  @Type(() => Locker)
  @IsOptional()
  Lockers?: Array<Locker>;

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
    type: () => [ParkingSpot],
  })
  @ValidateNested()
  @Type(() => ParkingSpot)
  @IsOptional()
  ParkingSpots?: Array<ParkingSpot>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  unitCount!: number;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}

export { Property as Property };
