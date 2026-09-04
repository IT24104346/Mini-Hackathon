export type SeverityType = 'Low' | 'Moderate' | 'High' | 'Critical';
export type StatusType = 'Active' | 'Monitoring' | 'Resolved';
export type FloodType = 
  | 'Flash Flood'
  | 'River Overflow'
  | 'Urban Flood'
  | 'Landslide-related Flooding'
  | 'Heavy Rain Flooding'
  | 'Coastal Surge';

export interface FloodReport {
  _id: string;
  location: string;
  district: string;
  description: string;
  floodType: FloodType;
  severity: SeverityType;
  waterLevel: number;
  affectedPeople: number;
  status: StatusType;
  latitude: number;
  longitude: number;
  reporterName?: string;
  contactNumber?: string;
  reportedAt: string;
  updatedAt: string;
}

export interface CreateFloodInput {
  location: string;
  district: string;
  description: string;
  floodType: FloodType;
  severity: SeverityType;
  waterLevel: number;
  affectedPeople: number;
  status: StatusType;
  latitude: number;
  longitude: number;
  reporterName?: string;
  contactNumber?: string;
}

export interface UpdateFloodInput extends Partial<CreateFloodInput> {}

export interface FloodStats {
  totalReports: number;
  activeFloods: number;
  monitoringFloods: number;
  resolvedFloods: number;
  criticalFloods: number;
  highFloods: number;
  moderateFloods: number;
  lowFloods: number;
  totalAffectedPeople: number;
  activeAffectedDistricts: number;
  districtBreakdown: Record<string, number>;
  floodTypeBreakdown: Record<string, number>;
  lastUpdated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  errors?: string[];
}

export interface FilterOptions {
  search: string;
  district: string;
  severity: string;
  status: string;
  floodType: string;
  sortBy: string;
  order: 'asc' | 'desc';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  district?: string;
  phone?: string;
  organization?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserProfile;
}
