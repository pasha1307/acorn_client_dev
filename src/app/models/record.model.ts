export interface Record {
  recordType?: string;
  recordId?: number;
  identificationId?: number;
  purposeId?: number;
  homeLocationId?: number;
  chargeToId?: number;
  title?: string;
  departmentId?: number;
  groupId?: number;
  projectId?: number;
  comments?: string;
  inactive?: boolean;
  editCounter?: boolean;
  nonDigitalImagesExist?: boolean;
  isBeingEdited?: boolean;
  editedById?: number;
  curatorId?: number;
  approvingCuratorId?: number;
  formatId?: number;
  coordinatorId?: number;
  isNonCollectionMaterial?: boolean;
  expectedDateOfReturn?: any;
  insuranceValue?: number;
  fundMemo?: string;
  authorArtist?: string;
  dateOfObject?: string;
  HOLLISNumber?: number;
  collectionName?: string;
  storage?: string;
  manuallyClosed?: any;
  manuallyClosedDate?: any;
}



