import { registerEnumType } from "@nestjs/graphql";

export enum EnumRequestStatus {
  Option_1 = "New",
  Option_2 = "In_Progress",
  Option_3 = "Pending_Approval",
  Option_4 = "Approved",
  Option_5 = "Disapproved",
  Option_6 = "Complete",
}

registerEnumType(EnumRequestStatus, {
  name: "EnumRequestStatus",
});
