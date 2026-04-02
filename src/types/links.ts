export type LinkStyle = 'cta-red' | 'cta-dark' | 'card' | 'community' | 'social';

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon?: string; // emoji
  style: LinkStyle;
  active: boolean;
  order: number;
}

export interface LinksData {
  links: LinkItem[];
  updatedAt: string;
}
