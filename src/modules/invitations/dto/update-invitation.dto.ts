export class UpdateInvitationDto {
  templateId?: string;
  slug?: string;
  title?: string;
  eventDate?: string;
  eventTime?: string;
  eventType?: string;
  sectionsUsed?: any; // { "hero": "hero_v3", "details": "details_v2" } - permite cambiar versiones de secciones
  sectionsOrder?: string[]; // ["hero_v3", "details_v2", "gallery_v1", "rsvp_basic"] - permite reordenar
  sectionsData?: any; // { "hero": {...}, "details": {...} } - permite actualizar contenido
  isPublic?: boolean;
}
