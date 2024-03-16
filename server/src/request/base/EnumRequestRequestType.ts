import { registerEnumType } from "@nestjs/graphql";

export enum EnumRequestRequestType {
  Type_1 = "moving_in",
  Type_2 = "moving_out",
  Type_3 = "intercom_change",
  Type_4 = "access_request",
  Type_5 = "violation_report",
  Type_6 = "deficiency_report",
  Type_7 = "question",
}

registerEnumType(EnumRequestRequestType, {
  name: "EnumRequestRequestType",
});
