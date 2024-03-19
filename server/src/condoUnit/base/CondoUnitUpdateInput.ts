import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  ValidateNested,
  IsString,
} from "class-validator";
import { Decimal } from "decimal.js";
import { FileUpdateManyWithoutCondoUnitsInput } from "./FileUpdateManyWithoutCondoUnitsInput";
import { Type } from "class-transformer";
import { LockerWhereUniqueInput } from "../../locker/base/LockerWhereUniqueInput";
import { ParkingSpotUpdateManyWithoutCondoUnitsInput } from "./ParkingSpotUpdateManyWithoutCondoUnitsInput";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { RegistrationKeyWhereUniqueInput } from "../../registrationKey/base/RegistrationKeyWhereUniqueInput";
import { UserCondoUpdateManyWithoutCondoUnitsInput } from "./UserCondoUpdateManyWithoutCondoUnitsInput";
import { RequestUpdateManyWithoutCondoUnitsInput } from "./RequestUpdateManyWithoutCondoUnitsInput";

@InputType()
class CondoUnitUpdateInput {
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
  })
  condoFee?: Decimal | null;

  @ApiProperty({
    required: false,
    type: () => FileUpdateManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => FileUpdateManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => FileUpdateManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  file?: FileUpdateManyWithoutCondoUnitsInput;

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
  locker?: LockerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => ParkingSpotUpdateManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotUpdateManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => ParkingSpotUpdateManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  parkingSpot?: ParkingSpotUpdateManyWithoutCondoUnitsInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  unitNumber?: string | null;

  @ApiProperty({
    required: false,
    type: () => RequestUpdateManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => RequestUpdateManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => RequestUpdateManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  requests?: RequestUpdateManyWithoutCondoUnitsInput;

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
  propertyID?: PropertyWhereUniqueInput | null;

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
  registrationKeys?: RegistrationKeyWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  size?: string;

  @ApiProperty({
    required: false,
    type: () => UserCondoUpdateManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => UserCondoUpdateManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => UserCondoUpdateManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  userCondos?: UserCondoUpdateManyWithoutCondoUnitsInput;
}

export { CondoUnitUpdateInput as CondoUnitUpdateInput };
