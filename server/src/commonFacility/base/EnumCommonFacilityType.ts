import { registerEnumType } from "@nestjs/graphql";

export enum EnumCommonFacilityType {
  Type_1 = "sky_lounge",
  Type_2 = "spa_fitness",
  Type_3 = "sauna",
}

registerEnumType(EnumCommonFacilityType, {
  name: "EnumCommonFacilityType",
});
