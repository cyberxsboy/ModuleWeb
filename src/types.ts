/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- MODULAR STATIC SITE BUILDER TYPES ---

export type BlockType = 'hero' | 'features' | 'about' | 'gallery' | 'cta' | 'slideshow' | 'footer';

export interface BlockItem {
  id: string;
  title: string;
  subtitle?: string;
  desc: string;
  icon?: string;
  image?: string;
  link?: string;
  clickUrl?: string; // custom hyperlinks on cards
}

export interface SiteBlock {
  id: string;
  type: BlockType;
  title: string;
  subtitle: string;
  description?: string;
  theme: 'light' | 'dark' | 'brand';
  align: 'left' | 'center' | 'right';
  image?: string; // base64 / data URL or local placeholder
  imageLink?: string; // hyperlink on top of the main image
  primaryBtn?: { text: string; url: string };
  secondaryBtn?: { text: string; url: string };
  items?: BlockItem[];

  // ELEMENTOR STYLING EXTENSIONS
  // Spacing (Advanced tab)
  paddingTop?: number;      // default: 80, range 0-250 (px)
  paddingBottom?: number;   // default: 80, range 0-250 (px)
  marginTop?: number;       // default: 0, range 0-120 (px)
  marginBottom?: number;    // default: 0, range 0-120 (px)

  // Typography & Custom Colors (Style tab)
  titleColor?: string;      // custom title hex
  subtitleColor?: string;   // custom subtitle hex
  descColor?: string;       // custom description hex
  bgColorCustom?: string;   // custom flat background solid (override theme)
  borderRadius?: number;    // rounded corner for grid cards or images
  boxShadow?: 'none' | 'sm' | 'md' | 'lg' | 'all-glow'; // card shadow
  bgGradientCustom?: string; // custom linear-gradient or radial-gradient style
  useCustomBgGradient?: boolean;

  // Grid Arrangement Layout (Content/Style tab)
  columns?: number;         // 1 to 4 columns
  cardSpacing?: number;     // 8 to 48px
  blockWidth?: 'narrow' | 'normal' | 'wide' | 'full'; // Size adjustment/bounds
  
  // Custom Interactivity / Slideshow properties
  entranceAnimation?: 'none' | 'fade-in' | 'slide-up' | 'zoom-in' | 'bounce-in';
  autoplayDuration?: number; // for slideshow carousel (e.g. 3000ms)
  dividerType?: 'none' | 'wave' | 'slant' | 'curve'; // Shape edge divider
}

export interface SiteConfig {
  title: string;
  themeColor: string; // Tailwind hex color or preset color
  fontFamily: string;
  blocks: SiteBlock[];
  cname?: string;
  hasHttps: boolean;
}

// --- GREETING CARD BUILDER TYPES ---

export interface GreetingText {
  id: string;
  text: string;
  color: string;
  fontSize: number; // in px
  x: number; // 0 to 100% boundary
  y: number; // 0 to 100% boundary
  animation: 'fade' | 'bounce' | 'slide' | 'zoom' | 'heartbeat';
}

export interface GreetingButton {
  id: string;
  text: string;
  url: string;
  x: number;
  y: number;
  color: string;
  bgColor: string;
  fontSize: number;
  borderRadius: number;
  animation?: 'pulse' | 'vibrate' | 'bounce' | 'none';
}

export type ParticleType = 'snow' | 'hearts' | 'stars' | 'confetti' | 'leaves' | 'none';
export type CardMediaType = 'image' | 'gif' | 'video' | 'none';

export interface GreetingCardConfig {
  id: string;
  title: string;
  bgType: 'gradient' | 'color' | 'media';
  bgGradient: string;
  bgColor: string;
  mediaType: CardMediaType;
  mediaUrl?: string; // data URL of the uploaded GIF/video/image
  mediaName?: string;
  mediaLink?: string; // image click hyperlink
  particles: ParticleType;
  textElements: GreetingText[];
  buttons?: GreetingButton[]; // custom hyperlinked buttons on the card
  musicTheme: 'silent' | 'birthday' | 'romantic' | 'lullaby' | 'ambient' | 'christmas';
  animationSpeed: number; // 1 to 5
  // Sizing and Frame customizing
  cardWidth?: number; // e.g. 400 (px)
  cardHeight?: number; // e.g. 600 (px)
  cardBorderRadius?: number; // e.g. 24 (px)
  cardBoxShadow?: 'none' | 'soft' | 'laser-glow' | 'gold-border';
  glassmorphism?: boolean; // elegant frosted overlay
}

// --- GENERIC API RESPONSE / STORAGE ---

export interface SharedAsset {
  id: string;
  type: 'site' | 'card';
  siteData?: SiteConfig;
  cardData?: GreetingCardConfig;
  createdAt: number;
}
