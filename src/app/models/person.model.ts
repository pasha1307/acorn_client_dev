export interface Person {
  personId?: number;
  locationId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  userPassword?: string;
  inactive?: boolean;
  accessLevel?: string;
  displayName?: string;
  sortName?: string;
  initials?: string;
  emailAddress?: string;
  receiveAllDRSEmail?: boolean;
}
