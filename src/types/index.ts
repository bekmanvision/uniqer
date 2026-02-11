import type {
  Tour,
  University,
  Application,
  Review,
  Partner,
  Program,
  Route,
  TourUniversity,
  TourStatus,
  UniversityType,
  ApplicantRole,
  ApplicationType,
  ApplicationStatus,
  ProgramType,
  AdminRole,
} from '@prisma/client'

export type {
  Tour,
  University,
  Application,
  Review,
  Partner,
  Program,
  Route,
  TourUniversity,
  TourStatus,
  UniversityType,
  ApplicantRole,
  ApplicationType,
  ApplicationStatus,
  ProgramType,
  AdminRole,
}

// Extended types with relations
export type TourWithUniversities = Tour & {
  universities: (TourUniversity & {
    university: University
  })[]
}

export type TourFull = Tour & {
  universities: (TourUniversity & {
    university: University
  })[]
  routes: Route[]
  _count?: {
    applications: number
  }
}

export type UniversityWithTours = University & {
  tours: (TourUniversity & {
    tour: Tour
  })[]
}

export type ApplicationWithTour = Application & {
  tour: Tour | null
}

// Form types
export interface TourFormData {
  title: string
  city: string
  startDate: string
  endDate: string
  price: number
  seats: number
  grade: string
  status: TourStatus
  description: string
  program: ProgramDay[]
  includes: string[]
  images: string[]
  featured: boolean
  universityIds: string[]
}

export interface ProgramDay {
  day: number
  title: string
  activities: string[]
}

export interface UniversityFormData {
  name: string
  city: string
  type: UniversityType
  description: string
  majors: string[]
  grants: boolean
  paid: boolean
  logo: string
  images: string[]
  website: string
}

export interface ApplicationFormData {
  name: string
  phone: string
  email?: string
  role: ApplicantRole
  tourId?: string
  type: ApplicationType
  message?: string
}

// Filter types
export interface TourFilters {
  city?: string
  grade?: string
  status?: TourStatus
  startDate?: string
  endDate?: string
}

export interface UniversityFilters {
  city?: string
  type?: UniversityType
}

export interface ApplicationFilters {
  status?: ApplicationStatus
  role?: ApplicantRole
  type?: ApplicationType
  tourId?: string
  startDate?: string
  endDate?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Stats for admin dashboard
export interface DashboardStats {
  totalTours: number
  activeTours: number
  totalApplications: number
  newApplications: number
  totalUniversities: number
  totalSeats: number
  totalRevenue: number
}
