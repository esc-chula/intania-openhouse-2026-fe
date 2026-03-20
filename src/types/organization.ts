export type OrganizationType = 'Department' | 'Club';

export interface Organization {
  org_id: number;
  org_type: OrganizationType;
  name_th: string;
  name_en: string;
  logo: string;
  org_description: string;
  short_story?: string;
  city?: string;
}
