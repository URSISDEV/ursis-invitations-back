export class CreateWhitelistDto {
  name: string;
  email: string;
  interestReason: string;
  isEventOrganizer?: boolean = false;
}
