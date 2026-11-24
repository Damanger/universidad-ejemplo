export interface BrandConfig {
  name: string;
  shortName: string;
  slogan: string;
  foundedYear: string;
  locationLabel: string;
  logoUrl: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    surface: string;
  };
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface HomeSection {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  stats: StatItem[];
  featuredDegreeEyebrow: string;
  featuredDegreeSummary: string;
  featuredHighlights: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  url: string;
  caption: string;
  category: string;
}

export interface UniversitySection {
  whoWeAreTitle: string;
  whoWeAreParagraphs: string[];
  mission: string;
  vision: string;
  institutionalObjective: string;
  values: ValueItem[];
  gallery: GalleryItem[];
}

export interface SubjectItem {
  code: string;
  name: string;
  credits: number;
}

export interface SemesterItem {
  semester: number;
  title: string;
  subjects: SubjectItem[];
}

export interface CareerFieldItem {
  area: string;
  description: string;
}

export interface ProgramSection {
  name: string;
  shortLabel: string;
  academicDegree: string;
  duration: string;
  modality: string;
  schedule: string;
  rvoe: string;
  heroImage: string;
  generalDescription: string;
  objective: string;
  entryProfile: string[];
  exitProfile: string[];
  curriculum: SemesterItem[];
  careerField: CareerFieldItem[];
}

export interface RequiredDocument {
  name: string;
  detail: string;
  required: boolean;
}

export interface ImportantDate {
  date: string;
  title: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface EnrollmentStep {
  step: string;
  title: string;
  description: string;
}

export interface CostItem {
  concept: string;
  amount: string;
  frequency: string;
}

export interface AdmissionsSection {
  announcementTitle: string;
  announcementStatus: string;
  announcementPeriod: string;
  announcementSummary: string;
  announcementPdfUrl: string;
  requirements: string[];
  documents: RequiredDocument[];
  importantDates: ImportantDate[];
  enrollmentSteps: EnrollmentStep[];
  costsAvailable: boolean;
  costsNote: string;
  costs: CostItem[];
}

export interface AcademicDocument {
  id: string;
  category: 'Reglamento' | 'Calendario' | 'Plan de Estudios' | 'Complementario';
  title: string;
  description: string;
  fileUrl: string;
  updatedAt: string;
  fileSize: string;
}

export interface AcademicEvent {
  id: string;
  date: string;
  monthLabel: string;
  dayLabel: string;
  time: string;
  title: string;
  location: string;
  category: string;
  speaker: string;
  description: string;
  featured: boolean;
}

export interface AcademicLifeSection {
  introTitle: string;
  introDescription: string;
  documents: AcademicDocument[];
  events: AcademicEvent[];
}

export interface ContactSection {
  address: string;
  cityState: string;
  phone: string;
  email: string;
  officeHours: string;
  whatsappNumber: string;
  whatsappMessage: string;
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

export interface PrivacySection {
  lastUpdated: string;
  responsibleEntity: string;
  summary: string;
  clauses: {
    title: string;
    content: string;
  }[];
}

export interface SeoConfig {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string;
}

export interface SiteContent {
  brand: BrandConfig;
  home: HomeSection;
  university: UniversitySection;
  program: ProgramSection;
  admissions: AdmissionsSection;
  academicLife: AcademicLifeSection;
  contact: ContactSection;
  privacy: PrivacySection;
  seo: SeoConfig;
}

export interface ContactSubmission {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  read: boolean;
}
