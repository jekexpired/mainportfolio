
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface Client {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
}

export type SectionType = 'hero' | 'gallery' | 'instagram' | 'clients' | 'faq' | 'contact' | 'custom-page';

export interface SectionVisibility {
  id: string;
  label: string;
  visible: boolean;
  type: SectionType;
  pageId?: string; // Required if type is 'custom-page'
}

export interface AppTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface InstagramConfig {
  enabled: boolean;
  mode: "api" | "embed";
  accessToken: string;
  userId: string;
  embedUrls: string[];
  postLimit: number;
  sectionTitle: string;
}

export type BlockType = 'heading' | 'paragraph' | 'image' | 'button' | 'gallery' | 'spacer' | 'divider';

export interface PageBlock {
  id: string;
  type: BlockType;
  content: any;
  settings: {
    alignment?: 'left' | 'center' | 'right';
    spacingTop?: number;
    spacingBottom?: number;
    fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
    buttonStyle?: 'primary' | 'secondary' | 'outline';
  };
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  seo: {
    title: string;
    description: string;
  };
  blocks: PageBlock[];
}

export interface SiteButton {
  label: string;
  url: string;
  target: '_self' | '_blank';
}

export interface AppConfig {
  branding: {
    name: string;
    description: string;
    logo?: string;
  };
  theme: AppTheme;
  gallery: GalleryImage[];
  clients: Client[];
  faq: FAQItem[];
  pages: CustomPage[];
  siteButtons: {
    [key: string]: SiteButton;
  };
  sectionVisibility: SectionVisibility[];
  instagram: InstagramConfig;
  contact: {
    email: string;
    phone: string;
    instagram: string;
  };
  security: {
    adminPassword: string;
  };
}
