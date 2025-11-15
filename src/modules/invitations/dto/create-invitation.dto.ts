export class CreateInvitationDto {
  templateId: string;
  slug: string;
  title: string;
  eventDate?: string;
  eventTime?: string;
  eventType?: string;
  sectionsUsed?: any; // { "hero": "hero_v2", "details": "details_v1", "gallery": "gallery_v1", "rsvp": "rsvp_basic" }
  sectionsOrder?: string[]; // ["hero_v2", "details_v1", "gallery_v1", "rsvp_basic"]
  sectionsData?: any; // { "hero": {...}, "details": {...}, "gallery": {...}, "rsvp": {...} }
  isPublic?: boolean;
}
