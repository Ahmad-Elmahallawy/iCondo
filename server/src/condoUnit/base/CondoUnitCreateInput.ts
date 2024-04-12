import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsString,
} from "class-validator";
import { Decimal } from "decimal.js";
import { FileCreateNestedManyWithoutCondoUnitsInput } from "./FileCreateNestedManyWithoutCondoUnitsInput";
import { Type } from "class-transformer";
import { LockerWhereUniqueInput } from "../../locker/base/LockerWhereUniqueInput";
import { ParkingSpotCreateNestedManyWithoutCondoUnitsInput } from "./ParkingSpotCreateNestedManyWithoutCondoUnitsInput";
import { PropertyWhereUniqueInput } from "../../property/base/PropertyWhereUniqueInput";
import { RegistrationKeyWhereUniqueInput } from "../../registrationKey/base/RegistrationKeyWhereUniqueInput";
import { UserCondoCreateNestedManyWithoutCondoUnitsInput } from "./UserCondoCreateNestedManyWithoutCondoUnitsInput";
import { RequestCreateNestedManyWithoutCondoUnitsInput } from "./RequestCreateNestedManyWithoutCondoUnitsInput";
@InputType()
class CondoUnitCreateInput {
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
    type: () => FileCreateNestedManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => FileCreateNestedManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => FileCreateNestedManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  file?: FileCreateNestedManyWithoutCondoUnitsInput;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  isPaid?: boolean | null;

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
    type: () => ParkingSpotCreateNestedManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => ParkingSpotCreateNestedManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => ParkingSpotCreateNestedManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  parkingSpot?: ParkingSpotCreateNestedManyWithoutCondoUnitsInput;

  @ApiProperty({
    required: false,
    type: () => RequestCreateNestedManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => RequestCreateNestedManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => RequestCreateNestedManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  requests?: RequestCreateNestedManyWithoutCondoUnitsInput;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  size!: string;

  @ApiProperty({
    required: false,
    type: () => UserCondoCreateNestedManyWithoutCondoUnitsInput,
  })
  @ValidateNested()
  @Type(() => UserCondoCreateNestedManyWithoutCondoUnitsInput)
  @IsOptional()
  @Field(() => UserCondoCreateNestedManyWithoutCondoUnitsInput, {
    nullable: true,
  })
  userCondos?: UserCondoCreateNestedManyWithoutCondoUnitsInput;
}

export { CondoUnitCreateInput as CondoUnitCreateInput };
