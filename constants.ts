
import { AppConfig } from './types';

export const INITIAL_CONFIG: AppConfig = {
  branding: {
    name: "Lumina Noir",
    description: "Architectural shadows and human light. Professional high-contrast photography for the modern era.",
    logo: "https://picsum.photos/200/200?grayscale"
  },
  theme: {
    primaryColor: "#0a0a0a",
    accentColor: "#6366f1",
    backgroundColor: "#0a0a0a",
    textColor: "#ffffff"
  },
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', alt: 'Midnight Ceremony', featured: true, visible: true, order: 0 },
    { id: '2', url: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80', alt: 'Vogue Portrait', featured: true, visible: true, order: 1 },
    { id: '3', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Dark Floral', featured: false, visible: true, order: 2 },
  ],
  clients: [
    { id: 'c1', name: 'Harper’s Bazaar' },
    { id: 'c2', name: 'Rolex' },
    { id: 'c3', name: 'Tesla' }
  ],
  faq: [
    { id: 'f1', question: 'Do you offer monochrome sessions?', answer: 'Exclusively. We believe black and white photography reveals the soul of the subject.', visible: true },
    { id: 'f2', question: 'What is the booking process?', answer: 'A 50% deposit is required to secure your date. We typically book 6 months in advance.', visible: true }
  ],
  pages: [
    {
      id: 'about-page',
      slug: 'about',
      title: 'About the Artist',
      published: true,
      seo: { title: 'About Lumina Noir', description: 'Learn about our photographic vision.' },
      blocks: [
        { id: 'b1', type: 'heading', content: { text: 'The Vision Behind the Lens' }, settings: { alignment: 'center', spacingBottom: 4 } },
        { id: 'b2', type: 'paragraph', content: { text: 'Founded on the principles of minimalism and light study, Lumina Noir explores the intersection of architecture and human emotion.' }, settings: { alignment: 'center', fontSize: 'lg' } },
        { id: 'b3', type: 'image', content: { url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80', alt: 'Studio' }, settings: {} }
      ]
    }
  ],
  siteButtons: {
    heroCta: { label: 'Enter Gallery', url: '/gallery', target: '_self' },
    heroSecondary: { label: 'Inquire Now', url: '#contact', target: '_self' },
    galleryLink: { label: 'All Collections', url: '/gallery', target: '_self' },
    contactSubmit: { label: 'Initiate Inquiry', url: '#', target: '_self' }
  },
  sectionVisibility: [
    { id: 'hero', label: 'Hero Section', visible: true, type: 'hero' },
    { id: 'gallery', label: 'Featured Gallery', visible: true, type: 'gallery' },
    { id: 'instagram', label: 'Instagram Feed', visible: true, type: 'instagram' },
    { id: 'clients', label: 'Clients', visible: true, type: 'clients' },
    { id: 'faq', label: 'FAQ', visible: true, type: 'faq' },
    { id: 'contact', label: 'Contact', visible: true, type: 'contact' }
  ],
  instagram: {
    enabled: true,
    mode: "embed",
    accessToken: "",
    userId: "jek.expired",
    embedUrls: [],
    postLimit: 6,
    sectionTitle: "Latest from Instagram"
  },
  contact: {
    email: "contact@luminanoir.com",
    phone: "+1 (555) 012-3456",
    instagram: "lumina.noir"
  },
  security: {
    adminPassword: "01774892355"
  }
};

export const FALLBACK_IMAGE = "https://placehold.co/800x600/0a0a0a/52525b?text=Image+Unavailable";
