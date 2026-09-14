// Shared types for all site content.
// Used by BOTH the public site and the admin panel.

export type HeroData = {
  title?: string;
  subtitle?: string;
  cta1?: string;
  cta2?: string;
  image?: string; // background image URL (Supabase Storage)
};

export type ServiceItem = {
  title?: string;
  desc?: string;
};

export type ServicesData = {
  heading?: string;
  subheading?: string;
  items?: ServiceItem[];
};

export type GalleryData = {
  heading?: string;
  subheading?: string;
};

export type GalleryItem = {
  id: string;
  url: string;
  title: string | null;
  tag: string | null;
};

export type AboutData = {
  heading?: string;
  body?: string;
  cta?: string;
  image?: string; // section photo (Supabase Storage)
};

export type TestimonialItem = {
  text?: string;
  name?: string;
  role?: string;
};

export type TestimonialsData = {
  heading?: string;
  items?: TestimonialItem[];
};

export type ContactData = {
  heading?: string;
  subtext?: string;
  formspreeId?: string; // the form ID from formspree.io
};
